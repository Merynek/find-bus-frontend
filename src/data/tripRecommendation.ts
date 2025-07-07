import {TripRecommendationType} from "../api/openapi";

interface ITripRecommendation {
    routes: TripRecommendationRoute[];
    type: TripRecommendationType;
    reduceRoutesHours: number;
    reduceTimeHours: number;
}

export class TripRecommendation {
    public routes: TripRecommendationRoute[];
    public type: TripRecommendationType;
    public reduceRoutesHours: number;
    public reduceTimeHours: number;

    constructor(settings: ITripRecommendation) {
        this.routes = settings.routes;
        this.type = settings.type;
        this.reduceRoutesHours = settings.reduceRoutesHours;
        this.reduceTimeHours = settings.reduceTimeHours;
    }
}

interface ITripRecommendationRoute {
    dJInHours: number;
    mInHours: number;
    realTimeInHours: number;
}

export class TripRecommendationRoute {
    public dJInHours: number;
    public mInHours: number;
    public realTimeInHours: number;

    constructor(settings: ITripRecommendationRoute) {
        this.dJInHours = settings.dJInHours;
        this.mInHours = settings.mInHours;
        this.realTimeInHours = settings.realTimeInHours;
    }
}