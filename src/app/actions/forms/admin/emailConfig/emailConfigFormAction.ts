'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import {AdminService} from "@/src/services/AdminService";
import {EmailConfigSchema} from "@/src/app/actions/forms/admin/emailConfig/emailConfigSchema";

export type TEmailConfigFormState = {
    errors?: {
        template?: string[];
        language?: string[];
        templateId?: string[];
    };
    message?: string;
    error?: string;
} | undefined;

export async function emailConfigFormAction(state: TEmailConfigFormState, formData: FormData): Promise<TEmailConfigFormState> {
    const validatedFields = EmailConfigSchema.safeParse({
        template: formData.get(FormDataEnum.template),
        language: formData.get(FormDataEnum.language),
        templateId: formData.get(FormDataEnum.templateId),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        await AdminService.setEmailConfig(validatedFields.data.template, validatedFields.data.language, validatedFields.data.templateId);
    } catch (error: any) {
        console.error('Chyba při update email configu:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během update email configu.',
        }
    }
    redirect(ROUTES.APP_CONFIG);
}