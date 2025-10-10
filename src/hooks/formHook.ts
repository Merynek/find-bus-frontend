import { z } from "zod";
import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {useActionState} from "react";

type TFormAction<Schema extends z.ZodSchema, ApiResult = unknown> = (
    state: TFormActionState<Schema, ApiResult>,
    formData: FormData
) => Promise<TFormActionState<Schema, ApiResult>>;

export function useFormActionState<T extends z.ZodSchema, A = unknown>(
    formAction: TFormAction<T, A>,
    initialState: TFormActionState<T, A>
) {
    const [state, action, pending] = useActionState(formAction, initialState);

    return [state, action, pending] as const;
}