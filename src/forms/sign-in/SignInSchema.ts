import { z } from 'zod'
import {LOCALES} from "@/src/utils/locale";

export const SignInFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().trim(),
    locale: z.nativeEnum(LOCALES)
})