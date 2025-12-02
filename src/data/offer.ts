import {UserDetail} from "./users/user-detail";
import {Price} from "./price";
import {FinancialDocument} from "@/src/data/documents/financialDocument";
import {Vehicle} from "@/src/data/vehicle/vehicle";

export interface IOfferSettings {
    id: number;
    user: UserDetail;
    vehicle: Vehicle;
    price: Price;
    endOfferDate: Date;
    accepted: boolean;
    acceptOfferDate: Date|null;
    clientRowVersion: string;
    documents: FinancialDocument[];
}

export class Offer {
    public id: number;
    public user: UserDetail;
    public vehicle: Vehicle;
    public price: Price;
    public accepted: boolean;
    public acceptOfferDate: Date|null;
    public endOfferDate: Date;
    public clientRowVersion: string;
    public documents: FinancialDocument[];

    constructor(settings: IOfferSettings) {
        this.id = settings.id;
        this.user = settings.user;
        this.vehicle = settings.vehicle;
        this.price = settings.price;
        this.accepted = settings.accepted;
        this.clientRowVersion = settings.clientRowVersion;
        this.endOfferDate = settings.endOfferDate;
        this.acceptOfferDate = settings.acceptOfferDate;
        this.documents = settings.documents;
    }
}