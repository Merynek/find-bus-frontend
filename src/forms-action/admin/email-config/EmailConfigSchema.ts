import { z } from 'zod'
import {EmailType, Languages} from "@/src/api/openapi";

export const EmailConfigSchema = z.object({
    template: z.enum(EmailType),
    language: z.enum(Languages),
    templateId: z.number().min(0)
})