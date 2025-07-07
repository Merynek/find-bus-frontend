import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {autowired} from "ironbean";
import {isEmail} from "@/src/utils/common";
import {EMAIL_ERROR_MESSAGES} from "../sign.pages";
import {AuthorizeApi} from "@/src/api/authorizeApi";

export class ForgotPasswordStore {
    @observable public changed: boolean = true;
    @observable private _email: string = "";
    @observable public emailIsValid: boolean = true;
    @autowired private _authorizeApi: AuthorizeApi;
    @observable public emailInvalidMessage: EMAIL_ERROR_MESSAGES = EMAIL_ERROR_MESSAGES.ENTER_EMAIL;
    @observable public requestSent: boolean = false;

    constructor() {
        makeObservable(this);
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
    }

    @computed
    get isValid() {
        return this.emailIsValid;
    }

    public async sendForgotPassword() {
        this.changed = false;
        this.validate();
        if (this.emailIsValid) {
            const response = await this._authorizeApi.forgotPassword({
                email: this._email
            });
            this.requestSent = true;
        }
    }
}