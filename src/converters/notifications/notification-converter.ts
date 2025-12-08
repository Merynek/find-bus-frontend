import {
    type NotificationResponseDto,
    type NotificationSettingsRequestDto
} from "@/src/api/openapi";
import {Notification} from "@/src/data/notifications/notification";
import {NotificationSettingsDataConverter} from "@/src/converters/notifications/notification-settings-data-converter";

export class NotificationConverter {
    public static toInstance(data: NotificationResponseDto): Notification {
        return new Notification({
            type: data.type,
            isSmsEnabled: data.isSmsEnabled,
            isEmailEnabled: data.isEmailEnabled,
            isAppPushEnabled: data.isAppPushEnabled,
            settingsJson: NotificationSettingsDataConverter.toInstance(data.settingsJson)
        });
    }

    public static toServer(data: Notification): NotificationSettingsRequestDto {
        return {
            type: data.type,
            isSmsEnabled: data.isSmsEnabled,
            isEmailEnabled: data.isEmailEnabled,
            isAppPushEnabled: data.isAppPushEnabled,
            settingsJson: NotificationSettingsDataConverter.toServer(data.settingsJson)
        }
    }

    public static toJson(data: Notification): NotificationResponseDto {
        return {
            type: data.type,
            isSmsEnabled: data.isSmsEnabled,
            isEmailEnabled: data.isEmailEnabled,
            isAppPushEnabled: data.isAppPushEnabled,
            settingsJson: NotificationSettingsDataConverter.toJson(data.settingsJson)
        }
    }
}