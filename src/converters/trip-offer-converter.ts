import {TripOfferMovementsResponseDto, TripOfferResponseDto} from "../api/openapi";
import {Offer} from "../data/offer";
import {TripOfferMovement} from "../data/tripOfferMovement";
import {PriceConverter} from "./price-converter";
import {FinancialDocumentConverter} from "./financial-document-converter";
import {UsersConverter} from "@/src/converters/users/users-converter";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";

export class TripOfferConverter {
    public static toInstance(response: TripOfferResponseDto): Offer {
        return new Offer({
            price: PriceConverter.toInstance(response.price),
            id: response.id,
            user: UsersConverter.userDetailToInstance(response.user),
            vehicle: VehicleConverter.toInstance(response.vehicle),
            accepted: response.accepted,
            endOfferDate: response.endOfferDate,
            acceptOfferDate: response.acceptOfferDate || null,
            documents: response.documents ? response.documents.map(FinancialDocumentConverter.toInstance) : []
        })
    }

    public static offerMovementToInstance(response: TripOfferMovementsResponseDto): TripOfferMovement {
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


    public static toJson(offer: Offer): TripOfferResponseDto {
        return {
            id: offer.id,
            user: UsersConverter.userDetailToJson(offer.user),
            vehicle: VehicleConverter.toJson(offer.vehicle),
            price: PriceConverter.toJson(offer.price),
            accepted: offer.accepted,
            endOfferDate: offer.endOfferDate,
            acceptOfferDate: offer.acceptOfferDate,
            documents: offer.documents.map(d => FinancialDocumentConverter.toJson(d))
        }
    }
}