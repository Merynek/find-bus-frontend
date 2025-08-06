import {AnyZodObject, z} from 'zod';

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
        } catch (error: any) {
            let errorMessage = 'Došlo k neočekávané chybě.';
            if (error.response?.json) {
                const apiError = await error.response.json();
                errorMessage = apiError.message || errorMessage;
            }
            return {
                success: false,
                message: errorMessage,
                data: data as Partial<z.infer<Schema>>,
            };
        }
    }
}