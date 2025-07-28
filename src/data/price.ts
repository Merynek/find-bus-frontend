import {computed, makeObservable, observable, runInAction} from "mobx";
import {Currency} from "../api/openapi";

interface IPrice {
    amount: number;
    currency: Currency;
}

export class Price {
    @observable private _amount: number;
    @observable private _currency: Currency;

    constructor(settings: IPrice) {
        this._amount = settings.amount;
        this._currency = settings.currency;
        makeObservable(this);
    }

    get currency(): Currency {
        return this._currency;
    }

    set currency(value: Currency) {
        runInAction(() => {
            this._currency = value;
        })
    }

    @computed
    get amount() {
        return this._amount
    }

    set amount(amount: number) {
        runInAction(() => {
            if (amount < 0) {
                return;
            }
            this._amount = amount;
        })
    }

    public clone(): Price {
        return new Price({
            amount: this._amount,
            currency: this._currency
        })
    }

    public static create(): Price {
        return new Price({
            amount: 0,
            currency: Currency.CZK
        })
    }

    public isEqual(price: Price) {
        return this._amount === price.amount && this._currency === price._currency;
    }

    public toString(): string {
        return this._amount.toString()
    }
}