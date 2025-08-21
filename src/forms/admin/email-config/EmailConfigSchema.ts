import { z } from 'zod'
import {EmailType, Language} from "@/src/api/openapi";

export const EmailConfigSchema = z.object({
    template: z.enum(EmailType),
    language: z.enum(Language),
    templateId: z.number().min(0)
})