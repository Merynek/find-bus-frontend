import {autowired, component} from "ironbean";
import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {CloseTripOfferReason, type FinancialDocumentType, TripOfferAcceptMethod} from "./openapi";
import {IApiRequest} from "./toolsApi";
import {Price} from "../data/price";
import {PriceConverter} from "../converters/price-converter";
import {TripOfferMovement} from "../data/tripOfferMovement";
import {TripOfferConverter} from "../converters/trip-offer-converter";
import {Offer} from "../data/offer";

export interface IGetTripMovementsRequest extends IApiRequest {
    tripId: number;
}
export interface IPostForceCloseTripRequest extends IApiRequest {
    tripId: number;
    reason: CloseTripOfferReason;
    reasonText: string;
}

export interface IPostPayedOfferRequest extends IApiRequest {
    offerId: number;
}

export interface IPostStartTripRequest extends IApiRequest {
    tripId: number;
}

export interface IPostFinishTripRequest extends IApiRequest {
    tripId: number;
}

export interface ICreateOfferRequest extends IApiRequest {
    tripId: number;
    vehicleId: number;
    price: Price;
    endOfferDate: Date;
}

export interface IUpdateOfferRequest extends IApiRequest {
    offerId: number;
    endOfferDate: Date;
}

export interface IGetTripOffersRequest extends IApiRequest {
    tripId: number;
}

export interface IDownloadDocumentRequest extends IApiRequest {
    documentId: number;
    type: FinancialDocumentType;
}

export interface IAcceptOfferRequest extends IApiRequest {
    offerId: number;
    acceptMethod: TripOfferAcceptMethod;
}

export interface IDeleteOfferRequest extends IApiRequest {
    tripId: number;
}

@component
export class TripsOfferApi {
    @autowired private _apiConfiguration: ApiConfiguration;

    private get _api() {
        return new OpenApi.TripOfferApi(this._apiConfiguration.config);
    }

    public async getTripOffers(req: IGetTripOffersRequest): Promise<Offer[]> {
        const data = await this._api.apiTripOfferGetTripOffersGet({
            tripId: req.tripId
        }, req.initOverrides);

        return data.map(TripOfferConverter.toClient);
    }

    public async acceptOffer(req: IAcceptOfferRequest): Promise<void> {
        await this._api.apiTripOfferAcceptOfferPost({
            acceptOfferRequestDto: {
                offerId: req.offerId,
                acceptMethod: req.acceptMethod
            }
        }, req.initOverrides);
    }

    public async updateOffer(req: IUpdateOfferRequest): Promise<void> {
        await this._api.apiTripOfferOfferPut({
            updateOfferRequestDto: {
                offerId: req.offerId,
                endOfferDate: req.endOfferDate
            }
        }, req.initOverrides);
    }

    public async deleteOffer(req: IDeleteOfferRequest): Promise<void> {
        await this._api.apiTripOfferOfferDelete({
            deleteTripOfferRequestDto: {
                tripId: req.tripId
            }
        }, req.initOverrides);
    }

    public async downloadFinancialDocument(req: IDownloadDocumentRequest): Promise<void> {
        const blob = await this._api.apiTripOfferDownloadDocumentGet({
            documentId: req.documentId,
            type: req.type
        }, req.initOverrides);
        const aElement = document.createElement("a");
        aElement.setAttribute("download", "document" + req.documentId);
        const href = URL.createObjectURL(blob);
        aElement.href = href;
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);
    }

    public async createOffer(req: ICreateOfferRequest): Promise<void> {
        await this._api.apiTripOfferOfferPost({
            createOfferRequestDto: {
                price: PriceConverter.toServer(req.price),
                tripId: req.tripId,
                vehicleId: req.vehicleId,
                endOfferDate: req.endOfferDate
            }
        }, req.initOverrides);
    }

    public async offerStateMovements(req: IGetTripMovementsRequest): Promise<TripOfferMovement[]> {
        const response = await this._api.apiTripOfferStateMovementsGet({
            tripId: req.tripId
        },req.initOverrides);

        return response.map(TripOfferConverter.offerMovementToClient);
    }

    public async payedOffer(req: IPostPayedOfferRequest): Promise<void> {
        await this._api.apiTripOfferPayedOfferPost({
            payedOfferRequestDto: {
                offerId: req.offerId
            }
        }, req.initOverrides);
    }

    public async startTrip(req: IPostStartTripRequest): Promise<void> {
        await this._api.apiTripOfferStartTripPost({
            startTripRequestDto: {
                tripId: req.tripId
            }
        }, req.initOverrides);
    }

    public async finishTrip(req: IPostFinishTripRequest): Promise<void> {
        await this._api.apiTripOfferFinishTripPost({
            finishTripRequestDto: {
                tripId: req.tripId
            }
        }, req.initOverrides);
    }

    public async forceCloseTrip(req: IPostForceCloseTripRequest): Promise<void> {
        await this._api.apiTripOfferCloseTripPost({
            closeTripRequestDto: {
                tripId: req.tripId,
                reason: req.reason,
                reasonText: req.reasonText
            }
        }, req.initOverrides);
    }
}