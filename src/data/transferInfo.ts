import {computed, makeObservable, observable} from "mobx";

export interface ITransferInfoSettings {
    iban: string;
    swift: string;
}

export class TransferInfo {
    @observable public iban: string;
    @observable public swift: string;

    constructor(settings: ITransferInfoSettings) {
        this.iban = settings.iban;
        this.swift = settings.swift;
        makeObservable(this);
    }

    @computed
    get isValid(): boolean {
        return Boolean(this.iban);
    }

    public static create() {
        return new TransferInfo({
            iban: "",
            swift: ""
        })
    }
}