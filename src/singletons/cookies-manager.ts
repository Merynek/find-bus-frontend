import {component} from "ironbean";

@component
export class CookiesManager {
    public setCookie(name: CookieName, value: string = "1", days: number = 365) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    public getCookie(name: CookieName) {
        let nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    public eraseCookie(name: CookieName) {
        document.cookie = name+'=; Max-Age=-99999999; path=/';
    }
}

export enum CookieName {
    TOKEN = "TOKEN",
    REFRESH_TOKEN = "REFRESH_TOKEN"
}