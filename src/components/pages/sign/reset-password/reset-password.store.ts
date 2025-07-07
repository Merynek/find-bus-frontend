import {action, makeObservable, observable, runInAction} from "mobx";
import {autowired} from "ironbean";
import {PASSWORD_ERROR_MESSAGES} from "../sign.pages";
import {AuthorizeApi} from "@/src/api/authorizeApi";

export default class ResetPasswordStore {
    @observable public changed: boolean = true;
    @observable private _password: string = "";
    @observable private _passwordConfirm: string = "";
    @observable public passwordIsValid: boolean = true;
    @observable public passwordConfirmIsValid: boolean = true;
    @observable public requestFailed: boolean = false;
    @observable public tokenIsValid: boolean = true;
    @observable public showLoader: boolean = false;
    @observable public invalidPasswordMessage: PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
    @observable public invalidConfirmPasswordMessage: PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
    @autowired private _authorizeApi: AuthorizeApi;
    public token: string;

    constructor(token: string) {
        this.token = token;
        makeObservable(this);
    }

    set password(value: string) {
        runInAction(() => {
            this.passwordIsValid = true;
            this._password = value;
            this.changed = true;
            this.removeErrors();
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
            this.removeErrors();
        })
    }

    @action
    private removeErrors() {
        this.passwordIsValid = true;
        this.passwordConfirmIsValid = true;
    }

    @action
    public validate() {
        if (this._password === "") {
            this.invalidPasswordMessage = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
            this.passwordIsValid = false;
        } else if (this._password.length < 8) {
            this.invalidPasswordMessage = PASSWORD_ERROR_MESSAGES.SHORT_PASSWORD;
            this.passwordIsValid = false;
        }
        if (this.passwordIsValid) {
            if (this._passwordConfirm === "") {
                this.passwordConfirmIsValid = false;
                this.invalidConfirmPasswordMessage = PASSWORD_ERROR_MESSAGES.ENTER_PASSWORD;
            } else if(this._passwordConfirm !== this._password) {
                this.passwordConfirmIsValid = false;
                this.invalidConfirmPasswordMessage = PASSWORD_ERROR_MESSAGES.NOT_SAME_PASSWORDS;
            }
        }
    }

    public async resetPassword(): Promise<boolean> {
        this.showLoader = true;
        this.changed = false;
        this.removeErrors();
        this.validate();
        if (this.passwordIsValid && this.passwordConfirmIsValid && this.token) {
            this._authorizeApi.resetPassword({
                token: this.token,
                password: this._password,
                confirmPassword: this._passwordConfirm
            }).then(() => {
                this.showLoader = false;
                return true;
            }).catch(() => {
                this.requestFailed = true;
                this.showLoader = false;
                return false;
            })
        }
        return false;
    }
}