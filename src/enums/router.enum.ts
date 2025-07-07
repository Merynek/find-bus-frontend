export interface IRoute {
    route: ROUTES;
    param?: string;
}

export enum ROUTES {
    HOME = "/home",
    LOGIN = "/login",
    REGISTRATION = "/registration",
    ACTIVE_USER = "/activeUser",
    RESET_PASSWORD = "/reset_password",
    FORGOT_PASSWORD = "/forgot_password",
    USER_SETTINGS = "/user_settings",
    VEHICLES = "/vehicles",
    CREATE_TRIP = "/create_trip",
    TRIP_LIST = "/trips",
    TRIP = "/trip",
    ADMIN_TRIPS = "/adminTrips",
    APP_CONFIG = "/appConfig",
    EMAIL_CONFIG = "/emailConfig",
    ADMIN_USERS = "/adminUsers",
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
