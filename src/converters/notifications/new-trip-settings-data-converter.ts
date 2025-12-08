import {
    type NotificationSettingsNewTripDataRequestDto,
    type NotificationSettingsNewTripDataResponseDto,
} from "@/src/api/openapi";
import {NewTripSettingsData} from "@/src/data/notifications/newTripNotificationSettingsData";

export class NewTripSettingsDataConverter {
    public static toInstance(data: NotificationSettingsNewTripDataResponseDto): NewTripSettingsData {
        return new NewTripSettingsData({
            radiusInMeters: data.radiusInMeters
        });
    }

    public static toServer(data: NewTripSettingsData): NotificationSettingsNewTripDataRequestDto {
        return {
            radiusInMeters: data.radiusInMeters
        }
    }

    public static toJson(data: NewTripSettingsData): NotificationSettingsNewTripDataResponseDto {
        return {
            radiusInMeters: data.radiusInMeters
        }
    }
}