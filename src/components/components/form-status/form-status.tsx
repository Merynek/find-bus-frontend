"use client";

import React, {useEffect, useState} from "react";
import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {z} from "zod";
import {useTranslate} from "@/src/hooks/translateHook";
import {FrontendErrorEnum} from "@/src/enums/frontend-error.enum";

type Props<T extends z.ZodSchema> = {
    state: TFormActionState<T>;
};

export function FormStatus<T extends z.ZodSchema>({state}: Props<T>) {
    const [message, setMessage] = useState(state?.message);
    const [errors, setErrors] = useState(state?.schemaErrors);
    const {t} = useTranslate("errors");

    useEffect(() => {
        setMessage(state?.message);
        setErrors(state?.schemaErrors);
    }, [state]);

    const hasGlobalErrors = errors && errors.errors && errors.errors.length > 0;
    const hasFieldErrors = errors && 'properties' in errors && errors.properties && Object.keys(errors.properties).length > 0;
    const appError = state?.appError;

    if (!message && !hasGlobalErrors && !hasFieldErrors && !appError) {
        return null;
    }

    return (
        <div className="">
            {message && !Boolean(state?.success) && <p className={"bg-red-100 text-red-700 p-3 mb-2"}>
                {// @ts-expect-error Expected error bcs of dynamic key
                    t("schemaErrors." + message)
                }
            </p>}
            {appError && !Boolean(state?.success) && <p className={"bg-red-100 text-red-700 p-3 mb-2"}>
                {// @ts-expect-error Expected error bcs of dynamic key
                    t("apiErrors." + appError.errorCode)
                }
                {appError.errorCode === FrontendErrorEnum.UNKNOWN && <p>{appError.message}</p>}
            </p>}
            {(hasGlobalErrors || hasFieldErrors) && (
                <div className="bg-red-50 text-red-700 p-4">
                    <h4 className="font-bold text-lg mb-2">{t("schemaErrors.formStatusLabel")}:</h4>
                    {hasGlobalErrors && errors?.errors && (
                        <ul className="list-disc list-inside mb-4">
                            {errors.errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}
                    {hasFieldErrors && typeof errors?.properties === 'object' && errors?.properties !== null && (
                        <ul className="list-disc list-inside space-y-1">
                            {Object.entries(errors.properties).map(([key, value]) => {
                                const errorValue = value as { errors?: string[] };
                                if (errorValue?.errors?.length) {
                                    const messages = errorValue.errors.map(err => {
                                        // @ts-expect-error Expected error bcs of dynamic key
                                        return t("schemaErrors." + err);
                                    });
                                    return (
                                        <li key={key}>
                                            <span className="text-red-600">{messages.join(", ")}</span>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
