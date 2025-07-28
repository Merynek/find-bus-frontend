import {computed, makeObservable, observable} from "mobx";
import {Country} from "../../api/openapi";

export interface IUserAddress {
    country: Country|null;
    city: string;
    psc: string;
    street: string;
    houseNumber: string;
}

export class UserAddress {
    @observable public country: Country | null;
    @observable public city: string;
    @observable public psc: string;
    @observable public street: string;
    @observable public houseNumber: string;

    constructor(settings: IUserAddress) {
        this.country = settings.country;
        this.city = settings.city;
        this.psc = settings.psc;
        this.street = settings.street;
        this.houseNumber = settings.houseNumber;
        makeObservable(this);
    }

    @computed
    get isValidForCreateInvoice(): boolean {
        return Boolean(this.country !== null && this.city && this.psc && this.street && this.houseNumber);
    }

    public static create() {
        return new UserAddress({
            street: "",
            city: "",
            psc: "",
            houseNumber: "",
            country: null
        })
    }
}
