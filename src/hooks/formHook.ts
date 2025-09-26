import { z } from "zod";
import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {useActionState} from "react";

type TFormAction<Schema extends z.ZodSchema> = (
    state: TFormActionState<Schema>,
    formData: FormData
) => Promise<TFormActionState<Schema>>;

export function useFormActionState<T extends z.ZodSchema>(
    formAction: TFormAction<T>,
    initialState: TFormActionState<T>
) {
    const [state, action, pending] = useActionState(formAction, initialState);

    return [state, action, pending] as const;
}