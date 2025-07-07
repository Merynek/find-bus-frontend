import {TripOfferMovementsResponseDto, TripOfferResponseDto} from "../api/openapi";
import {Offer} from "../data/offer";
import {UsersConverter} from "./users-converter";
import {VehicleConverter} from "./vehicle-converter";
import {TripOfferMovement} from "../data/tripOfferMovement";
import {PriceConverter} from "./price-converter";
import {FinancialDocumentConverter} from "./financial-document-converter";

export class TripOfferConverter {
    public static toClient(response: TripOfferResponseDto): Offer {
        return new Offer({
            price: PriceConverter.toClient(response.price),
            id: response.id,
            user: UsersConverter.userDetailToClient(response.user),
            vehicle: VehicleConverter.toClient(response.vehicle),
            accepted: response.accepted,
            endOfferDate: response.endOfferDate,
            acceptOfferDate: response.acceptOfferDate || null,
            documents: response.documents ? response.documents.map(FinancialDocumentConverter.toClient) : []
        })
    }

    public static offerMovementToClient(response: TripOfferMovementsResponseDto): TripOfferMovement {
        return new TripOfferMovement({
            id: response.id,
            tripId: response.tripId,
            datetime: response.datetime,
            from: response.from,
            to: response.to,
            reason: response.reason || null,
            customReason: response.customReason || null
        })
    }
}