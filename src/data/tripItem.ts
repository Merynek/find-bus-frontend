import {Amenities, TripOfferState} from "../api/openapi";
import {Route} from "./trip/route";
import {makeObservable, observable} from "mobx";

interface ITripItem {
    id: number;
    routes: Route[];
    numberOfPersons: number;
    amenities: Amenities[];
    dietForTransporter: boolean;
    endOffer: Date;
    offerHasEnded: boolean;
    alreadyOffered: boolean;
    isMine: boolean;
    offerState: TripOfferState;
    handicappedUserCount: number;
    hasOffers: boolean;
    totalDistanceInMeters: number;
    created: Date;
}

export class TripItem {
    public id: number;
    public routes: Route[];
    public numberOfPersons: number;
    public amenities: Amenities[];
    public dietForTransporter: boolean;
    public endOffer: Date;
    @observable public offerHasEnded: boolean;
    public alreadyOffered: boolean;
    public handicappedUserCount: number;
    public isMine: boolean;
    public offerState: TripOfferState;
    public hasOffers: boolean;
    public totalDistanceInMeters: number;
    public created: Date;

    constructor(settings: ITripItem) {
        this.id = settings.id;
        this.routes = settings.routes;
        this.numberOfPersons = settings.numberOfPersons;
        this.amenities = settings.amenities;
        this.dietForTransporter = settings.dietForTransporter;
        this.endOffer = settings.endOffer;
        this.offerHasEnded = settings.offerHasEnded;
        this.alreadyOffered = settings.alreadyOffered;
        this.isMine = settings.isMine;
        this.offerState = settings.offerState;
        this.handicappedUserCount = settings.handicappedUserCount;
        this.hasOffers = settings.hasOffers;
        this.totalDistanceInMeters = settings.totalDistanceInMeters;
        this.created = settings.created;
        makeObservable(this);
    }
}