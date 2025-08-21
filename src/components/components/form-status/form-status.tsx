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

    if (!message && !errors) {
        return null;
    }

    return (
        <div className="my-4 p-4 rounded-md">
            {message && (
                <p className={state?.success ? "bg-green-100 text-green-700 p-3 rounded-md mb-2" : "bg-red-100 text-red-700 p-3 rounded-md mb-2"}>
                    {message}
                </p>
            )}
            {errors && Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                    <h4 className="font-bold text-lg mb-2">Errors:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {Object.entries(errors).map(([key, value]) => {
                            if (value && typeof value === 'object' && '_errors' in value) {
                                const errorValue = value as { _errors?: string[] };
                                if (errorValue._errors) {
                                    return (
                                        <li key={key}>
                                            <strong className="capitalize">{key}:</strong> <span className="text-red-600">{errorValue._errors.join(", ")}</span>
                                        </li>
                                    );
                                }
                            }
                            return null;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}