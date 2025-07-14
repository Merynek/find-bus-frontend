import {UserDetail} from "./users/user-detail";
import {Vehicle} from "./users/vehicle";
import {makeObservable, observable} from "mobx";
import {Price} from "./price";
import {FinancialDocument} from "@/src/data/documents/financialDocument";
import {TripOfferResponseDto} from "@/src/api/openapi";

export interface IOfferSettings {
    id: number;
    user: UserDetail;
    vehicle: Vehicle;
    price: Price;
    endOfferDate: Date;
    accepted: boolean;
    acceptOfferDate: Date|null;
    documents: FinancialDocument[];
}

export class Offer {
    public id: number;
    public user: UserDetail;
    public vehicle: Vehicle;
    public price: Price;
    public accepted: boolean;
    public acceptOfferDate: Date|null;
    @observable public endOfferDate: Date;
    public documents: FinancialDocument[];

    constructor(settings: IOfferSettings) {
        this.id = settings.id;
        this.user = settings.user;
        this.vehicle = settings.vehicle;
        this.price = settings.price;
        this.accepted = settings.accepted;
        this.endOfferDate = settings.endOfferDate;
        this.acceptOfferDate = settings.acceptOfferDate;
        this.documents = settings.documents;
        makeObservable(this);
    }

    public toJson(): TripOfferResponseDto {
        return {
            id: this.id,
            user: this.user.toJson(),
            vehicle: this.vehicle.toJson(),
            price: this.price.toJson(),
            accepted: this.accepted,
            endOfferDate: this.endOfferDate,
            acceptOfferDate: this.acceptOfferDate,
            documents: this.documents.map(d => d.toJson())
        }
    }
}