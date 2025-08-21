import {z} from "zod";
import {UserRole} from "@/src/api/openapi";
import {LOCALES} from "@/src/utils/locale";

export const SignupFormSchema = z.object({
    email: z.email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .trim(),
    passwordConfirm: z.string().trim(),
    role: z.enum(UserRole),
    locale: z.enum(LOCALES),
}).strict()
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Hesla se neshodují.',
        path: ['passwordConfirm'],
    });