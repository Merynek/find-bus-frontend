import {component} from "ironbean";
import {action, computed, makeObservable, observable} from "mobx";
import {isAndroid, isIOS} from "react-device-detect";
import {DESKTOP_MIN_WIDTH, MOBILE_MAX_WIDTH} from "../utils/common";

interface IResizeSubscribe {
    uniqObject: object;
    callback: () => void;
}

@component
export class DeviceManager {
    @observable private _width: number;
    @observable private _height: number;
    private readonly _onResizeSubscribes: Map<object, () => void> = new Map<object, () => void>();

    constructor() {
        makeObservable(this);
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        window.addEventListener('resize', this.updateSize.bind(this), {
            passive: true
        });
        window.addEventListener('orientationchange', this.updateSize.bind(this), {
            passive: true
        });
    }

    @computed
    get windowWidth() {
        return this._width;
    }
    @computed
    get windowHeight() {
        return this._height;
    }

    get isAndroidDevice() {
        return isAndroid;
    }

    get isIOSDevice() {
        return isIOS;
    }

    @computed
    get isMobileResolution() {
        return this._width <= MOBILE_MAX_WIDTH;
    }

    @computed
    get isTabletResolution() {
        return this._width > MOBILE_MAX_WIDTH && this._width < DESKTOP_MIN_WIDTH;
    }

    @computed
    get isDesktopResolution() {
        return this._width >= DESKTOP_MIN_WIDTH;
    }

    get isSafari() {
        const is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        const is_safari = navigator.userAgent.indexOf("Safari") > -1;
        if (is_safari) {
            return !is_chrome; // Chrome seems to have both Chrome and Safari userAgents
        }
        return false;
    }

    public subscribeResize(subscribe: IResizeSubscribe) {
        this._onResizeSubscribes.set(subscribe.uniqObject, subscribe.callback);
    }

    public unSubscribeResize(uniqObject: object) {
        this._onResizeSubscribes.delete(uniqObject);
    }

    @action
    private updateSize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._onResizeSubscribes.forEach(clb => clb());
    }
}