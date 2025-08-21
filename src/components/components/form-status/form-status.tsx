"use client";

import React, {useEffect, useState} from "react";
import {TFormActionState} from "@/src/forms/BaseFormAction";
import {z} from "zod";

type Props<T extends z.ZodSchema> = {
    state: TFormActionState<T>;
};

export function FormStatus<T extends z.ZodSchema>({state}: Props<T>) {
    const [message, setMessage] = useState(state?.message);
    const [errors, setErrors] = useState(state?.errors);

    useEffect(() => {
        setMessage(state?.message);
        setErrors(state?.errors);
    }, [state]);

    const hasGlobalErrors = errors && errors.errors && errors.errors.length > 0;
    const hasFieldErrors = errors && 'properties' in errors && errors.properties && Object.keys(errors.properties).length > 0;

    if (!message && !hasGlobalErrors && !hasFieldErrors) {
        return null;
    }

    return (
        <div className="my-4 p-4 rounded-md">
            {message && (
                <p className={state?.success ? "bg-green-100 text-green-700 p-3 rounded-md mb-2" : "bg-red-100 text-red-700 p-3 rounded-md mb-2"}>
                    {message}
                </p>
            )}

            {(hasGlobalErrors || hasFieldErrors) && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                    <h4 className="font-bold text-lg mb-2">Chyby ve formuláři:</h4>
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
                                    return (
                                        <li key={key}>
                                            <strong className="capitalize">{key}:</strong> <span className="text-red-600">{errorValue.errors.join(", ")}</span>
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
