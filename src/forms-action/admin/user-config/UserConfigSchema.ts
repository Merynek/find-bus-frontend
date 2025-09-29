import { z } from 'zod'

export const UserConfigSchema = z.object({
    userId: z.number().min(0),
    tripOfferCommissionPercentage: z.number().min(0)
})