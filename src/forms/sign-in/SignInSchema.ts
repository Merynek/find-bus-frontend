import { z } from 'zod'
import {LOCALES} from "@/src/utils/locale";

export const SignInFormSchema = z.object({
    email: z.email({ error: 'invalidEmail' }).trim(),
    password: z.string({ error: 'invalidPassword' }).trim(),
    locale: z.enum(LOCALES)
})