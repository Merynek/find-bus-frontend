import { z } from 'zod'
import {NotificationsEnum} from "@/src/api/openapi";

const BaseNotificationSchema = z.object({
    isSmsEnabled: z.boolean(),
    isEmailEnabled: z.boolean(),
    isAppPushEnabled: z.boolean()
});

const NewOfferNotificationSchema = BaseNotificationSchema.extend({
    type: z.literal(NotificationsEnum.NEW_OFFER_FROM_TRANSPORTER),
    settingsJson: z.object({
        newTrip: z.any().optional().nullable()
    })
});

const NewTripNotificationSchema = BaseNotificationSchema.extend({
    type: z.literal(NotificationsEnum.NEW_TRIP),
    settingsJson: z.object({
        newTrip: z.object({
            radiusInMeters: z.number().int().positive("Radius musí být větší než 0."),
        })
    })
});

const NotificationSchema = z.discriminatedUnion("type", [
    NewTripNotificationSchema,
    NewOfferNotificationSchema
]);

export const NotificationsSchema = z.array(NotificationSchema);