import { z } from 'zod'
import {
    UserFinancialSettingsSchema
} from "@/src/forms-action/Schemas";
import {NotificationsSchema} from "@/src/forms-action/user-settings/NotificationsSchema";
import {LOCALES} from "@/src/enums/locale";

export const UserSettingsSchema = z.object({
    locale: z.enum(LOCALES),
    userFinancialSettings: UserFinancialSettingsSchema,
    phoneNumber: z.string().optional(),
    notifications: NotificationsSchema
});