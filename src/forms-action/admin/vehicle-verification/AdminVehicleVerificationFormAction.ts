import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {VehicleService} from "@/src/services/VehicleService";
import {LOCALES} from "@/src/enums/locale";
import {ISetVehicleVerificationRequest} from "@/src/api/vehicleApi";
import {
    AdminVehicleVerificationSchema
} from "@/src/forms-action/admin/vehicle-verification/AdminVehicleVerificationSchema";

type VehicleData = Partial<ISetVehicleVerificationRequest & {locale: LOCALES}>;

type VehicleApiResult = void;

export class AdminVehicleVerificationFormAction extends BaseFormAction<typeof AdminVehicleVerificationSchema, VehicleData, VehicleApiResult> {

    constructor() {
        super(AdminVehicleVerificationSchema);
    }

    protected createDataFromFormData(formData: FormData): VehicleData {
        return {
            vehicleId: this.getNumberFormValue(formData, FormDataEnum.vehicleId),
            description: this.getStringFormValue(formData, FormDataEnum.description),
            verified: this.getBooleanFormValue(formData, FormDataEnum.verified),
            locale: this.getEnumFormValue(formData, FormDataEnum.locale)
        };
    }

    protected async callApi(validatedData: z.infer<typeof AdminVehicleVerificationSchema>): Promise<VehicleApiResult> {
        await VehicleService.setVehicleVerification({
            vehicleId: validatedData.vehicleId,
            verified: validatedData.verified,
            description: validatedData.description
        })
    }
}