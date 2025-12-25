
export interface IRoute {
    route: ROUTES;
    params?: Record<string, string>;
}

export enum URL_PARAMS {
    TRIP_ID = "tripId",
    VEHICLE_ID = "vehicleId",
    USER_ID = "userId",
    TOKEN = "token"
}

export enum ROUTES {
    HOME = "/",
    SIGN_IN = "/sign/in",
    SIGN_UP = "/sign/up",
    ACTIVE_USER = `/active-user/[${URL_PARAMS.TOKEN}]`,
    RESET_PASSWORD = `/reset-password/[${URL_PARAMS.TOKEN}]`,
    FORGOT_PASSWORD = "/forgot-password",
    USER_SETTINGS = "/user-settings",
    TRANSPORT_REQUIREMENTS = `/transport-requirements`,
    VEHICLES = "/vehicles",
    VEHICLE_EDIT = `/vehicle-edit/[${URL_PARAMS.VEHICLE_ID}]`,
    REVIEW = `/review/[${URL_PARAMS.TOKEN}]`,
    CREATE_TRIP = `/create-trip`,
    DRAFT_TRIP = `/create-trip/[${URL_PARAMS.TRIP_ID}]`,
    TRIP_LIST = "/trips",
    TRIP_DRAFT_LIST = "/drafts",
    TRIP = `/trip/[${URL_PARAMS.TRIP_ID}]`,
    ADMIN_REVIEWS = "/admin/reviews",
    ADMIN_TRIPS = "/admin/trips",
    APP_CONFIG = "/admin/config",
    EMAIL_CONFIG = "/admin/emails",
    ADMIN_USERS = "/admin/users",
    ADMIN_USER = `/admin/user/[${URL_PARAMS.USER_ID}]`,
    ADMIN_TRIP_DETAIL = `/admin/trip/[${URL_PARAMS.TRIP_ID}]`,
    ADMIN_VEHICLE = `/admin/vehicle/[${URL_PARAMS.VEHICLE_ID}]`,
    ADMIN_TRANSPORT_REQUIREMENTS = `/admin/transport-requirements/[${URL_PARAMS.USER_ID}]`
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
    UNAUTHORIZED = "unauthorized",
    ACTION = "action"
}

export enum SEARCH_PARAMS_VALUE {
    LOGIN_REQUIRED = "login_required"
}
