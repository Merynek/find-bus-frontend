import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {UsersService} from "@/src/services/UsersService";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {TransportRequirementsSchema} from "@/src/forms-action/transport-requirements/TransportRequirementsSchema";
import {IUpdateTransportRequirementsRequest} from "@/src/api/usersApi";
import {FormActionEnum} from "@/src/enums/form-action.enum";

type TransportRequirementsData = Partial<IUpdateTransportRequirementsRequest & {formActionType: FormActionEnum}>;

export type TransportRequirementApiResult = {updatedRequirementsId: number, sendRequirementsToVerification: boolean};

export class TransportRequirementsFormAction extends BaseFormAction<typeof TransportRequirementsSchema, TransportRequirementsData, TransportRequirementApiResult> {

    constructor() {
        super(TransportRequirementsSchema);
    }

    protected createDataFromFormData(formData: FormData): TransportRequirementsData {
        return {
            concessionNumber: this.getStringFormValue(formData, FormDataEnum.concessionNumber),
            formActionType: this.getEnumFormValue(formData, FormDataEnum.formActionType)
        };
    }

    protected async callApi(validatedData: z.infer<typeof TransportRequirementsSchema>): Promise<TransportRequirementApiResult> {
        const id = await UsersService.updateTransportRequirements(validatedData);
        return {
            updatedRequirementsId: id,
            sendRequirementsToVerification: validatedData.formActionType === FormActionEnum.SAVE_AND_VERIFY
        }
    }
}