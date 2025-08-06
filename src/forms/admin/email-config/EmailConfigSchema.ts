import { z } from 'zod'
import {EmailType, Language} from "@/src/api/openapi";

export const EmailConfigSchema = z.object({
    template: z.nativeEnum(EmailType),
    language: z.nativeEnum(Language),
    templateId: z.number().min(0)
})