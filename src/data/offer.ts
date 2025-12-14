import {UserDetail} from "./users/user-detail";
import {Price} from "./price";
import {FinancialDocument} from "@/src/data/documents/financialDocument";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import type {OfferCanceledReason} from "@/src/api/openapi";

export interface IOfferSettings {
    id: number;
    user: UserDetail;
    vehicle: Vehicle;
    price: Price;
    endOfferDate: Date;
    accepted: boolean;
    canceled: boolean;
    canceledReason?: OfferCanceledReason;
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
    public canceled: boolean;
    public canceledReason?: OfferCanceledReason;
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
        this.canceled = settings.canceled;
        this.canceledReason = settings.canceledReason;
        this.clientRowVersion = settings.clientRowVersion;
        this.endOfferDate = settings.endOfferDate;
        this.acceptOfferDate = settings.acceptOfferDate;
        this.documents = settings.documents;
    }
}