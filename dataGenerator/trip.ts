import {Trip} from "@/src/data/trip/trip";
import {getRandomNumber} from "@/src/utils/common";
import {getRandomBoolean, getRandomEnum, getRandomId} from "./tools";
import {Amenities, CloseTripOfferReason, TripOfferState, TripRecommendationType, TripState} from "@/src/api/openapi";
import {getRandomDate} from "./time";
import {Offer} from "@/src/data/offer";
import {getRandomVehicle} from "./vehicle";
import {getRandomUserDetail} from "./user";
import {getRandomRoute} from "./route";
import {TripRecommendation, TripRecommendationRoute} from "@/src/data/tripRecommendation";
import {TripItem} from "@/src/data/tripItem";
import {TripOfferMovement} from "@/src/data/tripOfferMovement";
import {getRandomPrice} from "./price";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {FinancialDocument} from "@/src/data/documents/financialDocument";
import {getRandomFinancialDocument} from "@/dataGenerator/financialDocuments";

export function getRandomTrip(): Trip {
    return new Trip({
        id: getRandomId(),
        ownerId: getRandomId(),
        routes: [getRandomRoute()],
        numberOfPersons: getRandomNumber(1, 5),
        amenities: [getRandomEnum(Amenities), getRandomEnum(Amenities)],
        dietForTransporter: getRandomBoolean(),
        endOrder: getRandomDate(),
        orderHasEnded: getRandomBoolean(),
        state: getRandomEnum(TripState),
        offerState: getRandomEnum(TripOfferState),
        handicappedUserCount: getRandomNumber(0, 5),
        totalDistanceInMeters: getRandomNumber(10000, 35000),
        created: getRandomDate()
    })
}

export function getRandomTripItem(): TripItem {
    return new TripItem({
        id: getRandomId(),
        routes: [getRandomRoute()],
        numberOfPersons: getRandomNumber(1, 5),
        amenities: [getRandomEnum(Amenities), getRandomEnum(Amenities)],
        dietForTransporter: getRandomBoolean(),
        endOrder: getRandomDate(),
        orderHasEnded: getRandomBoolean(),
        state: getRandomEnum(TripState),
        offerState: getRandomEnum(TripOfferState),
        alreadyOffered: getRandomBoolean(),
        isMine: getRandomBoolean(),
        handicappedUserCount: getRandomNumber(0, 5),
        hasOffers: getRandomBoolean(),
        totalDistanceInMeters: getRandomNumber(10000, 35000),
        created: getRandomDate()
    })
}

export function getRandomOffer(): Offer {
    const documents: FinancialDocument[] = [];
    for (let i = 0; i < getRandomNumber(1, 4); i++) {
        documents.push(getRandomFinancialDocument())
    }

    return new Offer({
        id: getRandomId(),
        vehicle: getRandomVehicle(),
        user: getRandomUserDetail(),
        price: getRandomPrice(),
        endOfferDate: getRandomDate(),
        accepted: getRandomBoolean(),
        acceptOfferDate: getRandomBoolean() ? getRandomDate() : null,
        documents: documents,
        clientRowVersion: getRandomText(2)
    })
}

export function getRandomOfferMovement(): TripOfferMovement {
    return new TripOfferMovement({
        id: getRandomId(),
        datetime: getRandomDate(),
        tripId: getRandomId(),
        to: getRandomEnum(TripOfferState),
        from: getRandomEnum(TripOfferState),
        reason: getRandomEnum(CloseTripOfferReason),
        customReason: getRandomText(1)
    })
}

export function getRandomTripRecommendation(routesCount: number): TripRecommendation {
    const routes: TripRecommendationRoute[] = [];
    for (let i = 0; i < routesCount; i++) {
        routes.push(getRandomTripRouteRecommendation())
    }
    return new TripRecommendation({
        routes,
        type: getRandomEnum(TripRecommendationType),
        reduceRoutesHours: getRandomNumber(1, 5),
        reduceTimeHours: getRandomNumber(1, 5)
    })
}

export function getRandomTripRouteRecommendation(): TripRecommendationRoute {
    return new TripRecommendationRoute({
        dJInHours: getRandomNumber(0.5, 12),
        mInHours: getRandomNumber(0.5, 12),
        realTimeInHours: getRandomNumber(0.5, 12)
    })
}