import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {SignInFormSchema} from "@/src/forms-action/sign-in/SignInSchema";
import {LOCALES} from "@/src/enums/locale";

type SignInData = {
    email?: string;
    password?: string;
    locale?: LOCALES;
}

type SignInApiResult = void;

export class SignInFormAction extends BaseFormAction<typeof SignInFormSchema, SignInData, SignInApiResult> {

    constructor() {
        super(SignInFormSchema);
    }

    protected createDataFromFormData(formData: FormData): SignInData {
        return {
            email: this.getStringFormValue(formData, FormDataEnum.email),
            password: this.getStringFormValue(formData, FormDataEnum.password),
            locale: this.getEnumFormValue(formData, FormDataEnum.locale)
        };
    }

    protected async callApi(validatedData: z.infer<typeof SignInFormSchema>): Promise<SignInApiResult> {
        await AuthorizationService.login(validatedData.email, validatedData.password);
    }
}