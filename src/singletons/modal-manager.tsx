import {autowired, component} from "ironbean";
import {observable, makeObservable, action, reaction} from "mobx";
import React from "react";
import {setWindowScrolling} from "../utils/common";
import {DeviceManager} from "./device-manager";

export interface IModalOptions {
    enableDocumentScroll?: boolean;
}

interface IModalData {
    render: () => React.ReactNode;
    subModal: ModalData|null;
    parentModal: ModalData|null;
    options: IModalOptions;
}

export class ModalData {
    public render: () => React.ReactNode;
    @observable public subModal: ModalData|null;
    public parentModal: ModalData|null;
    public options: IModalOptions;

    constructor(settings: IModalData) {
        this.render = settings.render;
        this.subModal = settings.subModal;
        this.parentModal = settings.parentModal;
        this.options = settings.options;
        makeObservable(this);
    }
}

interface IModalChangeSubscribe {
    uniqObject: object;
    callback: () => void;
}

@component
export class ModalManager {
    @observable public modals: ModalData|null;
    @autowired private _deviceManager: DeviceManager;
    private readonly _modalChangeSubscribes: Map<object, () => void> = new Map<object, () => void>();

    constructor() {
        makeObservable(this);
        this.modals = null;
        reaction(() => this._deviceManager.isMobileResolution, () => {
            this._setScrolling();
        });
    }

    public subscribeChangeModal(subscribe: IModalChangeSubscribe) {
        this._modalChangeSubscribes.set(subscribe.uniqObject, subscribe.callback);
    }

    public unSubscribeChangeModal(uniqObject: object) {
        this._modalChangeSubscribes.delete(uniqObject);
    }

    @action
    public open(component: () => React.ReactNode, options?: IModalOptions) {
        const modal = this.getLastModal(this.modals);
        if (modal) {
            modal.subModal = new ModalData({
                parentModal: modal,
                subModal: null,
                render: component,
                options: options || {}
            })
        } else {
            this.modals = new ModalData({
                parentModal: null,
                subModal: null,
                render: component,
                options: options || {}
            })
        }
        this._onChange();
    }

    private getLastModal = (data: ModalData|null): ModalData|null  => {
        if (data && data.subModal) {
            return this.getLastModal(data.subModal);
        }
        return data;
    }

    private _setScrolling = () => {
        if (this._deviceManager.isMobileResolution && this.modals) {
            setWindowScrolling(false);
            return;
        }
        let lastModal = this.getLastModal(this.modals);
        if (lastModal) {
            setWindowScrolling(lastModal.options.enableDocumentScroll || false);
        } else {
            setWindowScrolling(true);
        }
    }

    @action
    public close() {
        const modal = this.getLastModal(this.modals);
        if (modal && modal.parentModal) {
            modal.parentModal.subModal = null;
        } else {
            this.modals = null;
        }
        this._onChange();
    }

    @action
    public closeAll() {
        this.modals = null;
        this._onChange();
    }

    private _onChange() {
        this._setScrolling();
        this._modalChangeSubscribes.forEach(clb => clb());
    }
}