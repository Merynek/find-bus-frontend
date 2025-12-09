import {Amenities, TripOfferState, TripState} from "../../api/openapi";
import {action, computed, makeObservable, observable} from "mobx";
import {Direction} from "./direction";
import {Route} from "./route";
import {Stop} from "./stop";
import {getTripMarkers} from "../../utils/map-markers";
import {Place} from "../place";
import {GeoPoint} from "../geoPoint";

interface ITrip {
    id: number;
    ownerId: number;
    name: string;
    routes: Route[];
    numberOfPersons: number|undefined;
    amenities: Amenities[];
    dietForTransporter: boolean|undefined;
    endOrder: Date|undefined;
    orderHasEnded: boolean;
    offerState: TripOfferState;
    handicappedUserCount: number|undefined;
    totalDistanceInMeters: number;
    state: TripState;
    created: Date;
}

export class Trip {
    public id: number;
    public ownerId: number;
    @observable public name: string;
    @observable public routes: Route[];
    @observable public numberOfPersons: number|undefined;
    @observable public amenities: Amenities[];
    @observable public dietForTransporter: boolean;
    @observable public endOrder: Date|undefined;
    @observable public orderHasEnded: boolean;
    @observable public handicappedUserCount: number|undefined;
    public totalDistanceInMeters: number;
    public state: TripState;
    public offerState: TripOfferState;
    private _observeChangesStarted: boolean;
    public created: Date;

    constructor(settings: ITrip) {
        this.id = settings.id;
        this.ownerId = settings.ownerId;
        this.name = settings.name;
        this.routes = settings.routes;
        this.routes.forEach(route => {
            this.setAddedRoute(route);
        });
        this.numberOfPersons = settings.numberOfPersons;
        this.amenities = settings.amenities;
        this.dietForTransporter = settings.dietForTransporter || false;
        this.endOrder = settings.endOrder;
        this.orderHasEnded = settings.orderHasEnded;
        this.offerState = settings.offerState;
        this.state = settings.state;
        this.handicappedUserCount = settings.handicappedUserCount;
        this.totalDistanceInMeters = settings.totalDistanceInMeters;
        this._observeChangesStarted = false;
        this.created = settings.created;
        makeObservable(this);
    }

    public startObservingChanges() {
        this._observeChangesStarted = true;
        this.routes.map(route => route.startObservingChanges());
    }

    public destroy() {
        this._observeChangesStarted = false;
        this.routes.map(route => route.destroy());
    }

    @computed
    get dateFrom(): Date|null {
        if (this.routes.length) {
            return this.routes[0].start;
        }
        return null;
    }

    @computed
    get dateTo(): Date|null {
        if (this.routes.length) {
            return this.routes[this.routes.length - 1].endTime;
        }
        return null;
    }

    @computed
    get isValid(): boolean {
        return this.routes.every(r => r.dateTimeIsValid);
    }

    @computed
    get directionTimes(): string {
        return this.routes.map(r => r.directionTimeMilliSeconds).toString();
    }

    @computed
    get pauses(): string {
        return this.routes.map(r => r.previousPauseInMilliSeconds).toString();
    }

    @action
    public addRoute() {
        const lastRoute: Route|undefined = this.routes[this.routes.length - 1];
        let lastPlace: Place|undefined;
        if (lastRoute) {
            lastPlace = lastRoute.to.place.clone();
        }
        const route = new Route({
            from: new Stop({
                place: lastPlace || new Place({}),
                route: null
            }),
            to: new Stop({
                place: new Place({}),
                route: null
            }),
            trip: this,
            start: new Date(),
            end: new Date(),
            direction: new Direction({})
        });
        if (this._observeChangesStarted) {
            route.startObservingChanges();
        }
        this.routes.push(route);
        route.start = route.minDate;
    }

    @computed
    get allGeoPoints(): GeoPoint[] {
        const points: GeoPoint[] = [];
        this.stops.forEach(s => {
            if (s.place.point) {
                points.push(s.place.point);
            }
        })

        return points;
    }

    @computed
    get stops(): Stop[] {
        const stops: Stop[] = [];
        this.routes.forEach(route => stops.push(route.from, route.to));
        return stops;
    }

    @action
    private setAddedRoute(route: Route) {
        route.trip = this;
    }

    public getNextDirectionStop(stop: Stop): Stop|undefined {
        const stopIndex = this.stops.indexOf(stop);
        return this.stops[stopIndex + 1];
    }

    @computed
    get directions() {
        const directions: Direction[] = [];
        this.routes.forEach(route => {
            directions.push(route.direction);
        });
        return directions;
    }

    @computed
    get markers() {
        return getTripMarkers(this);
    }

    public static create(tripSettings: Partial<ITrip>) {
        return new Trip({
            id: tripSettings.id || 0,
            ownerId: tripSettings.ownerId || 0,
            name: tripSettings.name || "",
            routes: tripSettings.routes || [],
            numberOfPersons: tripSettings.numberOfPersons || 0,
            dietForTransporter: tripSettings.dietForTransporter || false,
            amenities: tripSettings.amenities || [],
            endOrder: tripSettings.endOrder || new Date(),
            orderHasEnded: tripSettings.orderHasEnded || false,
            handicappedUserCount: tripSettings.handicappedUserCount || 0,
            offerState: tripSettings.offerState || TripOfferState.CREATED,
            state: tripSettings.state || TripState.DRAFT,
            totalDistanceInMeters: tripSettings.totalDistanceInMeters || 0,
            created: tripSettings.created || new Date()
        })
    }
}