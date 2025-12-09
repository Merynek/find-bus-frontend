import {Amenities, TripOfferState, TripState} from "../api/openapi";
import {Route} from "./trip/route";

interface ITripItem {
    id: number;
    routes: Route[];
    name: string;
    numberOfPersons: number|undefined;
    amenities: Amenities[];
    dietForTransporter: boolean|undefined;
    endOrder: Date|undefined;
    orderHasEnded: boolean;
    alreadyOffered: boolean;
    isMine: boolean;
    offerState: TripOfferState;
    state: TripState;
    handicappedUserCount: number|undefined;
    hasOffers: boolean;
    totalDistanceInMeters: number;
    created: Date;
}

export class TripItem {
    public id: number;
    public name: string;
    public routes: Route[];
    public numberOfPersons: number;
    public amenities: Amenities[];
    public dietForTransporter: boolean;
    public endOrder: Date|undefined;
    public orderHasEnded: boolean;
    public alreadyOffered: boolean;
    public handicappedUserCount: number;
    public isMine: boolean;
    public offerState: TripOfferState;
    public state: TripState;
    public hasOffers: boolean;
    public totalDistanceInMeters: number;
    public created: Date;

    constructor(settings: ITripItem) {
        this.id = settings.id;
        this.name = settings.name;
        this.routes = settings.routes;
        this.numberOfPersons = settings.numberOfPersons || 0;
        this.amenities = settings.amenities;
        this.dietForTransporter = settings.dietForTransporter || false;
        this.endOrder = settings.endOrder;
        this.orderHasEnded = settings.orderHasEnded;
        this.alreadyOffered = settings.alreadyOffered;
        this.isMine = settings.isMine;
        this.offerState = settings.offerState;
        this.state = settings.state;
        this.handicappedUserCount = settings.handicappedUserCount || 0;
        this.hasOffers = settings.hasOffers;
        this.totalDistanceInMeters = settings.totalDistanceInMeters;
        this.created = settings.created;
    }
}