import { z } from 'zod'
import {UserRole} from "@/src/api/openapi";

export const SignupFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .trim(),
    passwordConfirm: z.string().trim(),
    role: z.nativeEnum(UserRole)
}).strict()
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Hesla se neshodují.',
        path: ['passwordConfirm'],
    });