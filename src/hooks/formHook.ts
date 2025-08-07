import { ZodSchema } from "zod";
import {TFormActionState} from "@/src/forms/BaseFormAction";
import {useActionState} from "react";

type TFormAction<Schema extends ZodSchema> = (
    state: TFormActionState<Schema>,
    formData: FormData
) => Promise<TFormActionState<Schema>>;

export function useFormActionState<T extends ZodSchema>(
    formAction: TFormAction<T>,
    initialState: TFormActionState<T>
) {
    const [state, action, pending] = useActionState(formAction, initialState);

    return [state, action, pending] as const;
}