export interface IRoute {
    route: ROUTES;
    param?: string;
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
    CREATE_TRIP = "/create-trip",
    TRIP_LIST = "/trips",
    TRIP = "/trip",
    ADMIN_TRIPS = "/admin/trips",
    APP_CONFIG = "/admin/config",
    EMAIL_CONFIG = "/admin/emails",
    ADMIN_USERS = "/admin/users",
    ADMIN_TRIP_DETAIL = "/admin/trip"
}

export enum SEARCH_PARAMS {
    TOKEN = "token",
    PAGE = "page",
    DIET_FOR_TRANSPORTER = "dietForTransporter",
    NUMBER_OF_PERSONS = "numberOfPersons",
    ONLY_MINE = "onlyMine",
    DISTANCE_FROM = "distanceFrom",
    DISTANCE_TO = "distanceTo",
    ME_OFFERED = "meOffered",
    ID = "id"
}
