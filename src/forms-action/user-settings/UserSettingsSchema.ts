import { z } from 'zod'
import { NotificationsEnum } from "@/src/api/openapi";
import {ImageFileSchema, UserFinancialSettingsSchema} from "@/src/forms-action/Schemas";

export const UserSettingsSchema = z.object({
    userFinancialSettings: UserFinancialSettingsSchema.partial(),
    phoneNumber: z.string().optional(),
    notifications: z.array(z.enum(NotificationsEnum)).optional(),
    concessionNumber: z.string().optional(),
    businessRiskInsurance: ImageFileSchema.nullable().optional(),
    concessionDocuments: ImageFileSchema.nullable().optional()
});