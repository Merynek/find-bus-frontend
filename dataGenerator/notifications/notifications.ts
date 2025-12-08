import {NotificationSettingsData} from "@/src/data/notifications/notificationSettingsData";
import {NewTripSettingsData} from "@/src/data/notifications/newTripNotificationSettingsData";
import {getRandomNumber} from "@/src/utils/common";
import {NotificationsEnum} from "@/src/api/openapi";
import {Notification} from "@/src/data/notifications/notification";
import {getRandomBoolean, getRandomEnum} from "@/dataGenerator/tools";

export function getRandomNotification(type: NotificationsEnum|null = null): Notification {
    const _type = type || getRandomEnum(NotificationsEnum);
    return new Notification({
        type: _type,
        isAppPushEnabled: getRandomBoolean(),
        isEmailEnabled: getRandomBoolean(),
        isSmsEnabled: getRandomBoolean(),
        settingsJson: getRandomNotificationSettingsData(_type)
    })
}

export function getRandomNotificationSettingsData(type: NotificationsEnum|null = null): NotificationSettingsData {
    const data = new NotificationSettingsData({});

    switch (type) {
        case NotificationsEnum.NEW_TRIP:
            data.newTrip = getRandomNewTripSettingsData();
    }

    return data;
}

export function getRandomNewTripSettingsData(): NewTripSettingsData {
    return new NewTripSettingsData({
        radiusInMeters: getRandomNumber(2000, 999999)
    })
}