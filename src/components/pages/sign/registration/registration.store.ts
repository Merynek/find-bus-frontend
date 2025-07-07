import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {autowired} from "ironbean";
import {isEmail} from "../../../../utils/common";
import {EMAIL_ERROR_MESSAGES, PASSWORD_ERROR_MESSAGES} from "../sign.pages";
import {RegistrationApi} from "../../../../api/registrationApi";
import {UserRole} from "../../../../api/openapi";
import {AppManager} from "../../../../singletons/app-manager";
import {ROUTES} from "../../../../enums/router.enum";

export class RegistrationStore {
    @observable public changed: boolean = true;
    @autowired private _registrationApi: RegistrationApi;
    @observable private _email: string = "";
    @observable private _password: string = "";
    @observable private _passwordConfirm: string = "";
    @observable public emailIsValid: boolean = true;
    @observable public passwordIsValid: boolean = true;
    @observable public passwordConfirmIsValid: boolean = true;
    @observable public emailInvalidMessage: EMAIL_ERROR_MESSAGES = EMAIL_ERROR_MESSAGES.ENTER_EMAIL;
    @observable public invalidPasswordMessage: PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
    @observable public invalidConfirmPasswordMessage: PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
    @observable public userRole: UserRole = UserRole.DEMANDER;
    @autowired private _appManager: AppManager;

    constructor() {
        makeObservable(this);
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        runInAction(() => {
            this.passwordIsValid = true;
            this._password = value;
            this.changed = true;
        })
    }

    get passwordConfirm(): string {
        return this._passwordConfirm;
    }

    set passwordConfirm(value: string) {
        runInAction(() => {
            this.passwordConfirmIsValid = true;
            this._passwordConfirm = value;
            this.changed = true;
        })
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        runInAction(() => {
            this.emailIsValid = true;
            this._email = value;
            this.changed = true;
        })
    }

    @action
    public validate() {
        if (this._email === "") {
            this.emailIsValid = false;
            this.emailInvalidMessage = EMAIL_ERROR_MESSAGES.ENTER_EMAIL;
        } else if(!isEmail(this._email)) {
            this.emailIsValid = false;
            this.emailInvalidMessage = EMAIL_ERROR_MESSAGES.INVALID_EMAIL;
        }
        if (!this._password) {
            this.invalidPasswordMessage = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
            this.passwordIsValid = false;
        } else if (this._password.length < 8) {
            this.invalidPasswordMessage = PASSWORD_ERROR_MESSAGES.SHORT_PASSWORD;
            this.passwordIsValid = false;
        }
        if (this.passwordIsValid) {
            if (!this._passwordConfirm) {
                this.passwordConfirmIsValid = false;
                this.invalidConfirmPasswordMessage = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
            } else if(this._passwordConfirm !== this._password) {
                this.passwordConfirmIsValid = false;
                this.invalidConfirmPasswordMessage = PASSWORD_ERROR_MESSAGES.NOT_SAME_PASSWORDS;
            }
        }
    }

    @computed
    get isValid() {
        return this.passwordIsValid && this.passwordConfirmIsValid && this.emailIsValid;
    }

    public async registration(): Promise<boolean> {
        this.changed = false;
        this.validate();
        if (this.emailIsValid && this.passwordIsValid && this.passwordConfirmIsValid) {
            this._appManager.loading = true;
            await this._registrationApi.registration({
                email: this._email,
                password: this._password,
                role: this.userRole
            })
            this._appManager.loading = false;
            return true;
        }
        return false;
    }
}