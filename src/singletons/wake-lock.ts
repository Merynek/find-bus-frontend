import {component} from "ironbean";
import NoSleep from 'nosleep.js';

@component
export class WakeLock {
    private _noSleep: NoSleep;
    private readonly _enabled: boolean;

    constructor() {
        this._enabled = false;
        this._noSleep = new NoSleep();
    }

    public async enable() {
        if (!this._noSleep.isEnabled) {
            await this._noSleep.enable();
        }
    }

    public disable() {
        if (this._noSleep.isEnabled) {
            this._noSleep.disable();
        }
    }
}