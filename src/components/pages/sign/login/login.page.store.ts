import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {autowired} from "ironbean";
import {EMAIL_ERROR_MESSAGES, PASSWORD_ERROR_MESSAGES} from "../sign.pages";
import {isEmail} from "@/src/utils/common";
import {AppManager} from "@/src/singletons/app-manager";
import {AuthorizeApi} from "@/src/api/authorizeApi";

export class LoginPageStore {
    @observable public changed: boolean = true;
    @observable private _email: string = "";
    @observable private _password: string = "";
    @observable public emailIsValid: boolean = true;
    @observable public passwordIsValid: boolean = true;
    @observable public emailInvalidMessage: EMAIL_ERROR_MESSAGES = EMAIL_ERROR_MESSAGES.ENTER_EMAIL;
    @observable public invalidPasswordMessage: PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
    @autowired private _appStateManager: AppManager;
    @autowired private _authorizeApi: AuthorizeApi;

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
        if (this._password === "") {
            this.invalidPasswordMessage = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
            this.passwordIsValid = false;
        }
    }

    @computed
    get isValid() {
        return this.passwordIsValid && this.emailIsValid;
    }

    public async login(): Promise<boolean> {
        this.changed = false;
        this.validate();
        if (this.isValid) {
            this._appStateManager.loading = true;
            await this._authorizeApi.login({
                email: this._email,
                password: this._password
            }).then(() => {
                this._appStateManager.loading = false;
                return true;
            }).catch(() => {
                this._appStateManager.loading = false;
                return false;
            })
        }
        return false;
    }
}