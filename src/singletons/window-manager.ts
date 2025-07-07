import {component} from "ironbean";

interface ICloseWindowSubscribe {
    uniqObject: object;
    canClose: () => boolean;
}

@component
export class WindowManager {
    private readonly _closeWindowSubscribes: Map<object, () => boolean> = new Map<object, () => boolean>();

    constructor() {
        window.onbeforeunload = () => {
            for (let [key, canClose] of this._closeWindowSubscribes) {
                if (!canClose()) {
                    return "Can not close";
                }
            }
            return null;
        }
    }

    public destroy() {
        window.onbeforeunload = null;
    }

    public subscribeCloseWindow(subscribe: ICloseWindowSubscribe) {
        this._closeWindowSubscribes.set(subscribe.uniqObject, subscribe.canClose);
    }

    public unSubscribeCloseWindow(uniqObject: object) {
        this._closeWindowSubscribes.delete(uniqObject);
    }
}