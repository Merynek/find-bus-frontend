import {Country} from "../../api/openapi";

export interface IUserAddress {
    country: Country|null;
    city: string;
    psc: string;
    street: string;
    houseNumber: string;
}

export class UserAddress {
    public country: Country | null;
    public city: string;
    public psc: string;
    public street: string;
    public houseNumber: string;

    constructor(settings: IUserAddress) {
        this.country = settings.country;
        this.city = settings.city;
        this.psc = settings.psc;
        this.street = settings.street;
        this.houseNumber = settings.houseNumber;
    }

    // get isValidForCreateInvoice(): boolean { // todo
    //     return Boolean(this.country !== null && this.city && this.psc && this.street && this.houseNumber);
    // }

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
