import { z } from 'zod'
import {LOCALES} from "@/src/utils/locale";

export const SignInFormSchema = z.object({
    email: z.email({ error: 'Invalid email. mrdko' }).trim(),
    password: z.string().trim(),
    locale: z.enum(LOCALES)
})