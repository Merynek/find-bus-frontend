import {FormDataEnum} from "@/src/enums/form-data.enum";

export const getBooleanFormValue = (formData: FormData, key: FormDataEnum): boolean => {
    return getStringFormValue(formData, key) === 'on';
};

export const getFileFormValue = (formData: FormData, key: FormDataEnum): File|undefined => {
    const value = formData.get(key);
    if (!(value instanceof File)) {
        throw new Error("Only file is allowed.");
    }
    if (value.size === 0) {
        return undefined;
    }
    return value;
};

export const getStringFormValue = (formData: FormData, key: FormDataEnum): string|undefined => {
    const value = formData.get(key);
    if (value instanceof File) {
        throw new Error("File is not allowed.");
    }
    if (value === null) {
        return undefined;
    }
    return value;
};

export const getEnumFormValue = <T>(formData: FormData, key: FormDataEnum): T|undefined => {
    const value = formData.get(key);
    if (value instanceof File) {
        throw new Error("File is not allowed.");
    }
    if (value === null) {
        return undefined;
    }
    return value as T;
};

export const getEnumArrayFormValue = <T>(formData: FormData, key: FormDataEnum): T[]|undefined => {
    const values = formData.getAll(key);
    if (values instanceof File) {
        throw new Error("File is not allowed.");
    }
    if (values === null) {
        return undefined;
    }
    return values as T[];
};