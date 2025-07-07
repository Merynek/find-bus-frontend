import {type CloseTripOfferReason, TripOfferState} from "../api/openapi";

export interface ITripOfferMovementSettings {
    id: number;
    tripId: number;
    from: TripOfferState;
    to: TripOfferState;
    datetime: Date;
    reason: CloseTripOfferReason|null;
    customReason: string|null;
}

export class TripOfferMovement {
    public id: number;
    public tripId: number;
    public from: TripOfferState;
    public to: TripOfferState;
    public datetime: Date;
    public reason: CloseTripOfferReason|null;
    public customReason: string|null;

    constructor(settings: ITripOfferMovementSettings) {
        this.id = settings.id;
        this.tripId = settings.tripId;
        this.from = settings.from;
        this.to = settings.to;
        this.datetime = settings.datetime;
        this.reason = settings.reason;
        this.customReason = settings.customReason;
    }
}