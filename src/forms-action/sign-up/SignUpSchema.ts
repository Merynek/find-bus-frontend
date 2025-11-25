import {z} from "zod";
import {UserRole} from "@/src/api/openapi";
import {LOCALES} from "@/src/enums/locale";
import {RequiredStringSchema} from "@/src/forms-action/Schemas";

export const SignupFormSchema = z.object({
    email: z.email({ error: 'invalidEmail' }).trim(),
    password: z.string({ error: 'invalidPassword' }).trim(),
    passwordConfirm: z.string({ error: 'invalidPassword' }).trim(),
    clientUrl: RequiredStringSchema,
    role: z.enum(UserRole),
    locale: z.enum(LOCALES),
}).strict()
    .refine((data) => data.password === data.passwordConfirm, {
        error: 'passwordsDoNotMatch',
        path: ['passwordConfirm'],
    });