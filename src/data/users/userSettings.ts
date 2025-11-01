import {NotificationsEnum} from "../../api/openapi";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";

export interface IUserSettings {
    phoneNumber: string;
    notifications: NotificationsEnum[];
    userFinancialSettings: UserFinancialSettings;
    transportRequirementsId: number|null;
}

export class UserSettings {
    public phoneNumber: string;
    public notifications: NotificationsEnum[];
    public userFinancialSettings: UserFinancialSettings;
    public transportRequirementsId: number|null;

    constructor(settings: IUserSettings) {
        this.phoneNumber = settings.phoneNumber;
        this.notifications = settings.notifications;
        this.userFinancialSettings = settings.userFinancialSettings;
        this.transportRequirementsId = settings.transportRequirementsId;
    }
}