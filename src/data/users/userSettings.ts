import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";
import {Notification} from "@/src/data/notifications/notification";

export interface IUserSettings {
    phoneNumber: string;
    notifications: Notification[];
    userFinancialSettings: UserFinancialSettings;
    transportRequirementsId: number|null;
}

export class UserSettings {
    public phoneNumber: string;
    public notifications: Notification[];
    public userFinancialSettings: UserFinancialSettings;
    public transportRequirementsId: number|null;

    constructor(settings: IUserSettings) {
        this.phoneNumber = settings.phoneNumber;
        this.notifications = settings.notifications;
        this.userFinancialSettings = settings.userFinancialSettings;
        this.transportRequirementsId = settings.transportRequirementsId;
    }
}