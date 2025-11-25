"use client";

import React from "react";
import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {z} from "zod";
import { $ZodErrorTree } from 'zod/v4/core';
import {useTranslate} from "@/src/hooks/translateHook";
import {FrontendErrorEnum} from "@/src/enums/frontend-error.enum";

type Props<T extends z.ZodSchema> = {
    state: TFormActionState<T>;
    locKey: string;
};

type FlattenedFieldError = {
    key: string;
    messages: string[];
}

function getLastKey(fullPath: string): string {
    const keyWithoutIndices = fullPath.replace(/\[\d+\]/g, '');
    const lastDotIndex = keyWithoutIndices.lastIndexOf('.');
    return lastDotIndex !== -1 ? keyWithoutIndices.substring(lastDotIndex + 1) : keyWithoutIndices;
}

function getNestedFieldErrors<T extends z.ZodSchema>(
    errorTree: $ZodErrorTree<z.infer<T>> | undefined,
    path: string = '',
    locKey: string,
    t: (key: string) => string
): FlattenedFieldError[] {
    if (!errorTree || typeof errorTree !== 'object' || errorTree === null) {
        return [];
    }

    let fieldErrors: FlattenedFieldError[] = [];

    if (errorTree.errors && errorTree.errors.length > 0 && path) {
        const messages = errorTree.errors.map(err => {
            return t("errors.schemaErrors." + err);
        });
        const finalKey = getLastKey(path);
        fieldErrors.push({
            key: t(`${locKey}.${finalKey}`),
            messages: messages,
        });
    }

    if ('properties' in errorTree && errorTree.properties && typeof errorTree.properties === 'object') {
        Object.entries(errorTree.properties).forEach(([key, value]) => {
            const currentPath = path ? `${path}.${key}` : key;
            const nestedErrors = getNestedFieldErrors(
                value as $ZodErrorTree<z.infer<z.ZodSchema>>,
                currentPath,
                locKey,
                t
            );
            fieldErrors = fieldErrors.concat(nestedErrors);
        });
    }

    if ('items' in errorTree && errorTree.items && Array.isArray(errorTree.items)) {
        errorTree.items.forEach((item, index) => {
            const currentPath = path ? `${path}[${index}]` : `[${index}]`;
            const nestedErrors = getNestedFieldErrors(
                item as $ZodErrorTree<z.infer<z.ZodSchema>>,
                currentPath,
                locKey,
                t
            );
            fieldErrors = fieldErrors.concat(nestedErrors);
        });
    }

    return fieldErrors;
}

export function FormStatus<T extends z.ZodSchema>(props: Props<T>) {
    const {state, locKey} = props;
    const {t} = useTranslate();
    const message = state?.message;
    const errors = state?.schemaErrors;
    const appError = state?.appError;
    const tStringKey = t as (key: string) => string;
    const nestedFieldErrors = getNestedFieldErrors(errors, '', locKey, tStringKey);
    const hasGlobalErrors = errors && errors.errors && errors.errors.length > 0;
    const hasNestedErrors = nestedFieldErrors.length > 0;

    if (!message && !hasGlobalErrors && !hasNestedErrors && !appError) {
        return null;
    }

    return (
        <div className="">
            {message && !Boolean(state?.success) && <p className={"bg-red-100 text-red-700 p-3 mb-2"}>
                {// @ts-expect-error Expected error bcs of dynamic key
                    t("errors.schemaErrors." + message)
                }
            </p>}
            {appError && !Boolean(state?.success) && <p className={"bg-red-100 text-red-700 p-3 mb-2"}>
                {// @ts-expect-error Expected error bcs of dynamic key
                    t("errors.apiErrors." + appError.errorCode)
                }
                {appError.errorCode === FrontendErrorEnum.UNKNOWN && <p>{appError.message}</p>}
            </p>}
            {(hasGlobalErrors || hasNestedErrors) && (
                <div className="bg-red-50 text-red-700 p-4">
                    <h4 className="font-bold text-lg mb-2">{t("errors.schemaErrors.formStatusLabel")}:</h4>
                    {hasGlobalErrors && errors?.errors && (
                        <ul className="list-disc list-inside mb-4">
                            {errors.errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}
                    {hasNestedErrors && (
                        <ul className="list-disc list-inside space-y-1">
                            {nestedFieldErrors.map((fieldError, index) => (
                                <li key={index}>
                                    <span className="font-medium mr-2">{fieldError.key}:</span>
                                    <span className="text-red-600">{fieldError.messages.join(", ")}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}