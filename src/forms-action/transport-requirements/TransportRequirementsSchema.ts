import { z } from 'zod'
import {
    RequiredStringSchema
} from "@/src/forms-action/Schemas";
import {FormActionEnum} from "@/src/enums/form-action.enum";

export const TransportRequirementsSchema = z.object({
    concessionNumber: RequiredStringSchema,
    formActionType: z.enum(FormActionEnum)
});