import {autowired, component} from "ironbean";
import {action, makeObservable, observable} from "mobx";
import {CookieName, CookiesManager} from "./cookies-manager";
import {User} from "../data/users/user";
import {UserRole} from "../api/openapi";
import {Vehicle} from "../data/users/vehicle";
import { ApiConfiguration } from "../api/apiConfiguration";

@component
export class CurrentUser {
    @autowired private _cookiesManager: CookiesManager;
    @autowired private _apiConfiguration: ApiConfiguration;
    @observable protected _isLoggedIn: boolean;
    @observable protected _accessToken: string;
    protected _refreshToken: string;
    @observable public email: string;
    @observable public role: UserRole;
    @observable public id: number;
    @observable public vehicles: Vehicle[];

    constructor() {
        this._isLoggedIn = false;
        this._accessToken = "";
        this._refreshToken = "";
        this.email = "";
        this.role = UserRole.DEMANDER;
        this.id = 0;
        this.vehicles = [];
        makeObservable(this);
    }

    get isLoggedIn() {
        return this._isLoggedIn;
    }

    get accessToken() {
        return this._accessToken;
    }

    get refreshToken() {
        return this._refreshToken;
    }

    @action
    public tryLoginOnAppStart() {
        const token = this._cookiesManager.getCookie(CookieName.TOKEN);
        if (token) {
            this._setAccessToken(token);
            const refreshToken = this._cookiesManager.getCookie(CookieName.REFRESH_TOKEN);
            if (refreshToken) {
                this._refreshToken = refreshToken;
            }
        }
    }

    private _setAccessToken(token: string) {
        this._accessToken = token;
        this._apiConfiguration.setAccessToken(token);
    }

    @action
    public login(user: User, accessToken: string, refreshToken: string) {
        this._setAccessToken(accessToken);
        this._refreshToken = refreshToken;
        this._isLoggedIn = true;
        this.email = user.email;
        this.role = user.role;
        this.id = user.id;
        this.vehicles = [];
        this._cookiesManager.setCookie(CookieName.TOKEN, accessToken);
        this._cookiesManager.setCookie(CookieName.REFRESH_TOKEN, refreshToken);
    }

    @action
    public logout() {
        this._setAccessToken("");
        this._accessToken = "";
        this._refreshToken = "";
        this._isLoggedIn = false;
        this.vehicles = [];
        this._cookiesManager.eraseCookie(CookieName.TOKEN);
        this._cookiesManager.eraseCookie(CookieName.REFRESH_TOKEN);
    }
}