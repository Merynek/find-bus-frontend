import {NotificationsEnum} from "../../api/openapi";
import {TransportRequirements} from "../transportRequirements";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";

export interface IUserSettings {
    phoneNumber: string;
    notifications: NotificationsEnum[];
    transportRequirements: TransportRequirements;
    userFinancialSettings: UserFinancialSettings;
}

export class UserSettings {
    public phoneNumber: string;
    public notifications: NotificationsEnum[];
    public userFinancialSettings: UserFinancialSettings;
    public transportRequirements: TransportRequirements;

    constructor(settings: IUserSettings) {
        this.phoneNumber = settings.phoneNumber;
        this.notifications = settings.notifications;
        this.transportRequirements = settings.transportRequirements;
        this.userFinancialSettings = settings.userFinancialSettings;
    }
}