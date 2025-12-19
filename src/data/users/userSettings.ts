import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";
import {Notification} from "@/src/data/notifications/notification";
import {LOCALES} from "@/src/enums/locale";

export interface IUserSettings {
    locale: LOCALES;
    phoneNumber: string;
    notifications: Notification[];
    userFinancialSettings: UserFinancialSettings;
    transportRequirementsId: number|null;
}

export class UserSettings {
    public locale: LOCALES;
    public phoneNumber: string;
    public notifications: Notification[];
    public userFinancialSettings: UserFinancialSettings;
    public transportRequirementsId: number|null;

    constructor(settings: IUserSettings) {
        this.locale = settings.locale;
        this.phoneNumber = settings.phoneNumber;
        this.notifications = settings.notifications;
        this.userFinancialSettings = settings.userFinancialSettings;
        this.transportRequirementsId = settings.transportRequirementsId;
    }
}