import { z } from 'zod'

export const SignInFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .trim(),
    passwordConfirm: z
        .string()
        .trim(),
})

export type FormState =
    | {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined