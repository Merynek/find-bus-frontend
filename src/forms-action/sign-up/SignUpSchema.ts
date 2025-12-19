import {z} from "zod";
import {UserRole} from "@/src/api/openapi";
import {LOCALES} from "@/src/enums/locale";

export const SignupFormSchema = z.object({
    email: z.email({ error: 'invalidEmail' }).trim(),
    password: z.string({ error: 'invalidPassword' }).trim(),
    passwordConfirm: z.string({ error: 'invalidPassword' }).trim(),
    locale: z.enum(LOCALES),
    role: z.enum(UserRole)
}).strict()
    .refine((data) => data.password === data.passwordConfirm, {
        error: 'passwordsDoNotMatch',
        path: ['passwordConfirm'],
    });