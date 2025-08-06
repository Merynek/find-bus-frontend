import {AnyZodObject, z} from 'zod';
import {FormDataEnum} from "@/src/enums/form-data.enum";

export type TFormActionState<T extends AnyZodObject> = {
    success?: boolean;
    message?: string;
    errors?: z.ZodFormattedError<z.infer<T>>;
    data?: Partial<z.infer<T>>;
} | undefined;

export abstract class BaseFormAction<Schema extends AnyZodObject, Data, ApiResult> {

    protected constructor(protected readonly schema: Schema) {}

    protected abstract createDataFromFormData(formData: FormData): Data;

    protected abstract callApi(validatedData: z.infer<Schema>): Promise<ApiResult>;

    public async handle(formData: FormData): Promise<TFormActionState<Schema>> {
        const data = this.createDataFromFormData(formData);

        const validatedFields = this.schema.partial().safeParse(data);

        if (!validatedFields.success) {
            const errors = validatedFields.error.format() as z.ZodFormattedError<z.infer<Schema>>;

            return {
                success: false,
                errors: errors,
                message: 'Některá zadaná data nejsou platná.',
                data: data as Partial<z.infer<Schema>>,
            };
        }

        try {
            await this.callApi(validatedFields.data as z.infer<Schema>);
            return {
                success: true,
                message: 'Formulář byl úspěšně odeslán.',
                data: data as Partial<z.infer<Schema>>,
            };
        } catch (error) {
            let errorMessage = 'Došlo k neočekávané chybě.';
            if (error && typeof error === 'object' && 'response' in error) {
                const apiError = (error as { response: { json: () => Promise<{ message?: string }> } });
                if (apiError.response?.json) {
                    const jsonError = await apiError.response.json();
                    errorMessage = jsonError.message || errorMessage;
                }
            }
            return {
                success: false,
                message: errorMessage,
                data: data as Partial<z.infer<Schema>>,
            };
        }
    }

    protected getBooleanFormValue(formData: FormData, key: FormDataEnum): boolean {
        return this.getStringFormValue(formData, key) === 'on';
    }

    protected getFileFormValue(formData: FormData, key: FormDataEnum): File|undefined {
        const value = formData.get(key);
        if (!(value instanceof File)) {
            throw new Error("Only file is allowed.");
        }
        if (value.size === 0) {
            return undefined;
        }
        return value;
    }

    protected getEnumArrayFormValue<T>(formData: FormData, key: FormDataEnum): T[]|undefined {
        const values = formData.getAll(key);
        if (values instanceof File) {
            throw new Error("File is not allowed.");
        }
        if (values === null) {
            return undefined;
        }
        return values as T[];
    }

    protected getEnumFormValue<T>(formData: FormData, key: FormDataEnum): T|undefined {
        return this.getStringFormValue(formData, key) as T || undefined;
    }

    protected getStringFormValue(formData: FormData, key: FormDataEnum): string|undefined {
        const value = formData.get(key);
        if (value instanceof File) {
            throw new Error("File is not allowed.");
        }
        if (value === null) {
            return undefined;
        }
        return value;
    }
}