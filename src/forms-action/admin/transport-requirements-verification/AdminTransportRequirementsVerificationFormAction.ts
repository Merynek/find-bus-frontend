import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {LOCALES} from "@/src/enums/locale";
import {
    AdminTransportRequirementsVerificationSchema
} from "@/src/forms-action/admin/transport-requirements-verification/AdminTransportRequirementsVerificationSchema";
import {UsersService} from "@/src/services/UsersService";
import {ISetTransportRequirementsVerificationRequest} from "@/src/api/usersApi";

type RequirementsData = Partial<ISetTransportRequirementsVerificationRequest & {locale: LOCALES}>;

type RequirementsApiResult = void;

export class AdminTransportRequirementsVerificationFormAction extends BaseFormAction<typeof AdminTransportRequirementsVerificationSchema, RequirementsData, RequirementsApiResult> {

    constructor() {
        super(AdminTransportRequirementsVerificationSchema);
    }

    protected createDataFromFormData(formData: FormData): RequirementsData {
        return {
            transportRequirementsId: this.getNumberFormValue(formData, FormDataEnum.requirementsId),
            description: this.getStringFormValue(formData, FormDataEnum.description),
            verified: this.getBooleanFormValue(formData, FormDataEnum.verified),
            locale: this.getEnumFormValue(formData, FormDataEnum.locale)
        };
    }

    protected async callApi(validatedData: z.infer<typeof AdminTransportRequirementsVerificationSchema>): Promise<RequirementsApiResult> {
        await UsersService.transportRequirementsVerification({
            transportRequirementsId: validatedData.requirementsId,
            verified: validatedData.verified,
            description: validatedData.description
        })
    }
}