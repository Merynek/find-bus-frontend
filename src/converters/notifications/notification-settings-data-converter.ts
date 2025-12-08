import {
    type NotificationSettingsDataRequestDto, type NotificationSettingsDataResponseDto
} from "@/src/api/openapi";
import {NotificationSettingsData} from "@/src/data/notifications/notificationSettingsData";
import {NewTripSettingsDataConverter} from "@/src/converters/notifications/new-trip-settings-data-converter";

export class NotificationSettingsDataConverter {
    public static toInstance(data: NotificationSettingsDataResponseDto): NotificationSettingsData {
        return new NotificationSettingsData({
            newTrip: data.newTrip ? NewTripSettingsDataConverter.toInstance(data.newTrip) : undefined
        });
    }

    public static toServer(data: NotificationSettingsData): NotificationSettingsDataRequestDto {
        return {
            newTrip: data.newTrip ? NewTripSettingsDataConverter.toServer(data.newTrip) : undefined
        }
    }

    public static toJson(data: NotificationSettingsData): NotificationSettingsDataResponseDto {
        return {
            newTrip: data.newTrip ? NewTripSettingsDataConverter.toJson(data.newTrip) : undefined
        }
    }
}