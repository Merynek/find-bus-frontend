import {NotificationsEnum} from "@/src/api/openapi";
import {NotificationSettingsData} from "@/src/data/notifications/notificationSettingsData";

interface INotification {
    isSmsEnabled: boolean;
    isEmailEnabled: boolean;
    isAppPushEnabled: boolean;
    type: NotificationsEnum;
    settingsJson: NotificationSettingsData;
}

export class Notification {
    public isSmsEnabled: boolean;
    public isEmailEnabled: boolean;
    public isAppPushEnabled: boolean;
    public type: NotificationsEnum;
    public settingsJson: NotificationSettingsData;

    constructor(data: INotification) {
        this.isAppPushEnabled = data.isAppPushEnabled;
        this.isSmsEnabled = data.isSmsEnabled;
        this.isEmailEnabled = data.isEmailEnabled;
        this.type = data.type;
        this.settingsJson = data.settingsJson;
    }
}