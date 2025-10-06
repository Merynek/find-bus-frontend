import {z} from 'zod';
import {FormDataEnum} from "@/src/enums/form-data.enum";
import { $ZodErrorTree } from 'zod/v4/core';
import {FindBusError, IFindBusError} from "@/src/errors/FindBusError";

export type TFormActionState<Schema extends z.ZodSchema> = {
    success?: boolean;
    message?: string;
    schemaErrors?: $ZodErrorTree<z.infer<Schema>>;
    appError?: IFindBusError;
    data?: Partial<z.infer<Schema>>;
} | undefined;

export abstract class BaseFormAction<Schema extends z.ZodSchema, Data, ApiResult> {

    protected constructor(protected readonly schema: Schema) {}

    protected abstract createDataFromFormData(formData: FormData): Data;

    protected abstract callApi(validatedData: z.infer<Schema>): Promise<ApiResult>;

    public async handle(formData: FormData): Promise<TFormActionState<Schema>> {
        const data = this.createDataFromFormData(formData);
        const validatedFields = this.schema.safeParse(data);

        if (!validatedFields.success) {
            const errors = z.treeifyError(validatedFields.error);
            return {
                success: false,
                schemaErrors: errors,
                data: data as Partial<z.infer<Schema>>,
            };
        }

        try {
            await this.callApi(validatedFields.data);
            return {
                success: true,
                data: data as Partial<z.infer<Schema>>,
            };
        } catch (error: unknown) {
            if (error instanceof FindBusError) {
                return {
                    success: false,
                    appError: error.toJson(),
                    data: data as Partial<z.infer<Schema>>
                };
            }
            return {
                success: false,
                message: "unexpectedError",
                data: data as Partial<z.infer<Schema>>,
            };
        }
    }

    protected getBooleanFormValue(formData: FormData, key: FormDataEnum): boolean {
        return this.getStringFormValue(formData, key) === 'on';
    }

    protected getFileFormValue(formData: FormData, key: FormDataEnum): File|undefined {
        const value = formData.get(key);
        if (value === null) {
            return undefined;
        }
        if (!(value instanceof File)) {
            throw new Error("Only file is allowed.");
        }
        if (value.size === 0) {
            return undefined;
        }
        return value;
    }

    protected getFileArrayFormValue(formData: FormData, key: FormDataEnum): File[]|undefined {
        const values = formData.getAll(key);
        if (values.length === 0) {
            return undefined;
        }

        const files: File[] = [];
        for (const value of values) {
            if (!(value instanceof File)) {
                throw new Error("Only files are allowed in file array.");
            }
            if (value.size > 0) {
                files.push(value);
            }
        }
        return files.length > 0 ? files : undefined;
    }

    protected getEnumArrayFormValue<T>(formData: FormData, key: FormDataEnum): T[]|undefined {
        const values = formData.getAll(key);
        if (values === null) {
            return undefined;
        }
        if (values instanceof File) {
            throw new Error("File is not allowed.");
        }
        return values as T[];
    }

    protected getEnumFormValue<T>(formData: FormData, key: FormDataEnum): T|undefined {
        return this.getStringFormValue(formData, key) as T || undefined;
    }

    protected getStringFormValue(formData: FormData, key: FormDataEnum): string|undefined {
        const value = formData.get(key);
        if (value === null) {
            return undefined;
        }
        if (value instanceof File) {
            throw new Error("File is not allowed.");
        }
        return value;
    }

    protected getNumberFormValue(formData: FormData, key: FormDataEnum): number | undefined {
        const stringValue = this.getStringFormValue(formData, key);
        if (stringValue === undefined) {
            return undefined;
        }
        const numberValue = parseFloat(stringValue);
        if (isNaN(numberValue)) {
            return undefined;
        }
        return numberValue;
    }

    protected getNumberArrayFormValue(formData: FormData, key: FormDataEnum): number[]|undefined {
        const values = formData.getAll(key);
        if (values === null) {
            return undefined;
        }
        if (values instanceof File) {
            throw new Error("File is not allowed.");
        }
        return values
            .map(value => parseFloat(value as string))
            .filter(value => !isNaN(value));
    }
}