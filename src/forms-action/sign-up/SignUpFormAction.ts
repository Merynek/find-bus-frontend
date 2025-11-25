import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {SignupFormSchema} from "@/src/forms-action/sign-up/SignUpSchema";
import {LOCALES} from "@/src/enums/locale";
import {IRegistrationRequest} from "@/src/api/registrationApi";

type SignUpData = Partial<IRegistrationRequest & {passwordConfirm: string, locale: LOCALES}>;

type SignUpApiResult = void;

export class SignUpFormAction extends BaseFormAction<typeof SignupFormSchema, SignUpData, SignUpApiResult> {

    constructor() {
        super(SignupFormSchema);
    }

    protected createDataFromFormData(formData: FormData): SignUpData {
        return {
            email: this.getStringFormValue(formData, FormDataEnum.email),
            password: this.getStringFormValue(formData, FormDataEnum.password),
            passwordConfirm: this.getStringFormValue(formData, FormDataEnum.password_confirm),
            role: this.getEnumFormValue(formData, FormDataEnum.role),
            locale: this.getEnumFormValue(formData, FormDataEnum.locale),
            clientUrl: this.getStringFormValue(formData, FormDataEnum.activeUrl)
        };
    }

    protected async callApi(validatedData: z.infer<typeof SignupFormSchema>): Promise<SignUpApiResult> {
        await AuthorizationService.signUp(validatedData.email, validatedData.password, validatedData.role, validatedData.clientUrl);
    }
}