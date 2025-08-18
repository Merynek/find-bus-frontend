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
        <div className="form-status">
            {message && (
                <p className={state?.success ? "success-message" : "error-message"}>
                    {message}
                </p>
            )}
            {errors && Object.keys(errors).length > 0 && (
                <div className="error-list">
                    <h4>Errors:</h4>
                    <ul>
                        {Object.entries(errors).map(([key, value]) => {
                            if (value && typeof value === 'object' && '_errors' in value) {
                                const errorValue = value as { _errors?: string[] };
                                if (errorValue._errors) {
                                    return (
                                        <li key={key}>
                                            <strong>{key}:</strong> {errorValue._errors.join(", ")}
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