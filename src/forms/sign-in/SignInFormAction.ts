import {BaseFormAction} from "@/src/forms/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {SignInFormSchema} from "@/src/forms/sign-in/SignInSchema";

type SignInData = {
    email?: string;
    password?: string;
    locale?: string;
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
            locale: this.getStringFormValue(formData, FormDataEnum.locale)
        };
    }

    protected async callApi(validatedData: z.infer<typeof SignInFormSchema>): Promise<SignInApiResult> {
        await AuthorizationService.login(validatedData.email, validatedData.password);
    }
}