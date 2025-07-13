import { z } from 'zod'

export const ResetPasswordSchema = z.object({
    token: z.string().trim(),
    password: z
        .string()
        .trim(),
    passwordConfirm: z.string().trim()
}).strict()
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Hesla se neshodují.',
        path: ['passwordConfirm'],
    });