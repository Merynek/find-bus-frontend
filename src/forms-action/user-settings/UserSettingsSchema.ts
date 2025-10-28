import { z } from 'zod'
import { NotificationsEnum } from "@/src/api/openapi";
import {ImageFileSchema, UserFinancialSettingsSchema} from "@/src/forms-action/Schemas";

export const UserSettingsSchema = z.object({
    userFinancialSettings: UserFinancialSettingsSchema,
    phoneNumber: z.string().optional(),
    notifications: z.array(z.enum(NotificationsEnum)),
    concessionNumber: z.string(),
    businessRiskInsurance: ImageFileSchema.nullable().optional(),
    concessionDocuments: ImageFileSchema.nullable().optional()
});