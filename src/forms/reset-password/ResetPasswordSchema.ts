import { z } from 'zod'

export const ResetPasswordSchema = z.object({
    token: z.string().trim(),
    password: z.string({ error: 'invalidPassword' }).trim(),
    passwordConfirm: z.string({error: 'invalidPassword'}).trim()
}).strict()
    .refine((data) => data.password === data.passwordConfirm, {
        error: 'passwordsDoNotMatch',
        path: ['passwordConfirm'],
    });