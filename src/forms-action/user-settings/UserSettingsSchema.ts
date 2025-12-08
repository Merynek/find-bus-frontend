import { z } from 'zod'
import {
    UserFinancialSettingsSchema
} from "@/src/forms-action/Schemas";
import {NotificationsSchema} from "@/src/forms-action/user-settings/NotificationsSchema";

export const UserSettingsSchema = z.object({
    userFinancialSettings: UserFinancialSettingsSchema,
    phoneNumber: z.string().optional(),
    notifications: NotificationsSchema
});