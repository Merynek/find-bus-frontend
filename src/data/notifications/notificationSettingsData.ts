import {NewTripSettingsData} from "@/src/data/notifications/newTripNotificationSettingsData";

interface INotificationSettingsData {
    newTrip?: NewTripSettingsData;
}

export class NotificationSettingsData {
    public newTrip: NewTripSettingsData|null

    constructor(data: INotificationSettingsData) {
        this.newTrip = data.newTrip || null;
    }
}