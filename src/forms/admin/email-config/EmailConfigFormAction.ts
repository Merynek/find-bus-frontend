import {BaseFormAction} from "@/src/forms/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AdminService} from "@/src/services/AdminService";
import {EmailConfigSchema} from "@/src/forms/admin/email-config/EmailConfigSchema";
import {Languages} from "@/src/api/openapi";

type EmailConfigData = {
    template?: string;
    language?: Languages;
    templateId?: number;
}

type EmailConfigApiResult = void;

export class EmailConfigFormAction extends BaseFormAction<typeof EmailConfigSchema, EmailConfigData, EmailConfigApiResult> {

    constructor() {
        super(EmailConfigSchema);
    }

    protected createDataFromFormData(formData: FormData): EmailConfigData {
        return {
            template: this.getStringFormValue(formData, FormDataEnum.template),
            language: this.getEnumFormValue(formData, FormDataEnum.language),
            templateId: this.getNumberFormValue(formData, FormDataEnum.templateId)
        };
    }

    protected async callApi(validatedData: z.infer<typeof EmailConfigSchema>): Promise<EmailConfigApiResult> {
        await AdminService.setEmailConfig(validatedData.template, validatedData.language, validatedData.templateId);
    }
}