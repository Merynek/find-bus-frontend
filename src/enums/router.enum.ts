
export interface IRoute {
    route: ROUTES;
    params?: Record<string, string>;
}

export enum URL_PARAMS {
    TRIP_ID = "tripId",
    VEHICLE_ID = "vehicleId"
}

export enum ROUTES {
    HOME = "/",
    SIGN_IN = "/sign/in",
    SIGN_UP = "/sign/up",
    ACTIVE_USER = "/active-user",
    RESET_PASSWORD = "/reset-password",
    FORGOT_PASSWORD = "/forgot-password",
    USER_SETTINGS = "/user-settings",
    VEHICLES = "/vehicles",
    VEHICLE_EDIT = `/vehicle-edit/[${URL_PARAMS.VEHICLE_ID}]`,
    CREATE_TRIP = "/create-trip",
    TRIP_LIST = "/trips",
    TRIP = `/trip/[${URL_PARAMS.TRIP_ID}]`,
    ADMIN_TRIPS = "/admin/trips",
    APP_CONFIG = "/admin/config",
    EMAIL_CONFIG = "/admin/emails",
    ADMIN_USERS = "/admin/users",
    ADMIN_TRIP_DETAIL = `/admin/trip/[${URL_PARAMS.TRIP_ID}]`,
    ADMIN_VEHICLE = `/admin/vehicle/[${URL_PARAMS.VEHICLE_ID}]`
}

export enum SEARCH_PARAMS {
    TOKEN = "token",
    PAGE = "page",
    DIET_FOR_TRANSPORTER = "dietForTransporter",
    NUMBER_OF_PERSONS = "numberOfPersons",
    ONLY_MINE = "onlyMine",
    DISTANCE_FROM = "distanceFrom",
    DISTANCE_TO = "distanceTo",
    MAX_DISTANCE_IN_METERS = "maxDistanceInMeters",
    ME_OFFERED = "meOffered",
    ID = "id",
    UNAUTHORIZED = "unauthorized"
}
