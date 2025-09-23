import {
    CreateTripRequestDto,
    TripResponseDto,
    TripRecommendationRequestDto,
    TripRecommendationRouteRequestDto, TripRecommendationResponseDto
} from "../../api/openapi";
import {Trip} from "../../data/trip/trip";
import {TripRecommendation, TripRecommendationRoute} from "../../data/tripRecommendation";
import {milliSecondsToSeconds} from "../../utils/common";
import {RouteConverter} from "./route-converter";
import {toJS} from "mobx";

export class TripConverter {
    public static toInstance(apiTrip: TripResponseDto): Trip {
        return new Trip({
            id: apiTrip.id,
            ownerId: apiTrip.ownerId,
            amenities: apiTrip.amenities,
            dietForTransporter: apiTrip.dietForTransporter,
            numberOfPersons: apiTrip.numberOfPersons,
            routes: apiTrip.routes.map((r) => RouteConverter.toInstance(r)),
            endOrder: apiTrip.endOrder,
            offerHasEnded: apiTrip.offerHasEnded,
            offerState: apiTrip.offerState,
            handicappedUserCount: apiTrip.handicappedUserCount,
            totalDistanceInMeters: apiTrip.totalDistanceInMeters,
            created: apiTrip.created
        })
    }

    public static toServer(trip: Trip): CreateTripRequestDto {
        return {
            routes: trip.routes.map((r) => RouteConverter.toServer(r)),
            numberOfPersons: trip.numberOfPersons || 0,
            dietForTransporter: trip.dietForTransporter,
            amenities: toJS(trip.amenities),
            endOrder: trip.endOrder,
            handicappedUserCount: trip.handicappedUserCount || 0
        }
    }

    public static tripRecommendationToServer(trip: Trip): TripRecommendationRequestDto {
        const apiRoutes: TripRecommendationRouteRequestDto[] = [];
        trip.routes.forEach(route => {
            apiRoutes.push({
                directionTimeSeconds: milliSecondsToSeconds(route.directionTimeMilliSeconds),
                previousPauseTimeSeconds: milliSecondsToSeconds(route.previousPauseInMilliSeconds)
            })
        });
        return {
            routes: apiRoutes
        }
    }

    public static tripRecommendationToInstance(apiRecommendation: TripRecommendationResponseDto): TripRecommendation {
        return new TripRecommendation({
            routes: apiRecommendation.routes.map(r => {
                return new TripRecommendationRoute({
                    mInHours: r.mInHours,
                    dJInHours: r.dJInHours,
                    realTimeInHours: r.realTimeInHours
                })
            }),
            type: apiRecommendation.type,
            reduceRoutesHours: apiRecommendation.reduceRoutesHours,
            reduceTimeHours: apiRecommendation.reduceTimeHours
        })
    }

    public static toJson(trip: Trip): TripResponseDto {
        return {
            id: trip.id,
            ownerId: trip.ownerId,
            routes: trip.routes.map(r => RouteConverter.toJson(r)),
            numberOfPersons: trip.numberOfPersons || 0,
            amenities: toJS(trip.amenities),
            dietForTransporter: trip.dietForTransporter,
            endOrder: trip.endOrder,
            offerHasEnded: trip.offerHasEnded,
            offerState: trip.offerState,
            handicappedUserCount: trip.handicappedUserCount || 0,
            totalDistanceInMeters: trip.totalDistanceInMeters,
            created: trip.created
        }
    }
}