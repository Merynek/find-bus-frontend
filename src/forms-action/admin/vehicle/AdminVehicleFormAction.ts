import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {VehicleService} from "@/src/services/VehicleService";
import {LOCALES} from "@/src/enums/locale";
import {FindBusError} from "@/src/errors/FindBusError";
import {FrontendErrorEnum} from "@/src/enums/frontend-error.enum";
import {AdminVehicleSchema} from "@/src/forms-action/admin/vehicle/AdminVehicleSchema";
import {IUploadVehiclePublicPhotosRequest} from "@/src/api/vehicleApi";

type VehicleData = Partial<{vehicleId: number} & IUploadVehiclePublicPhotosRequest & {locale: LOCALES}>;

type VehicleApiResult = void;

export class AdminVehicleFormAction extends BaseFormAction<typeof AdminVehicleSchema, VehicleData, VehicleApiResult> {

    constructor() {
        super(AdminVehicleSchema);
    }

    protected createDataFromFormData(formData: FormData): VehicleData {
        return {
            vehicleId: this.getNumberFormValue(formData, FormDataEnum.vehicleId),
            photoFiles: this.getFileArrayFormValue(formData, FormDataEnum.imagesUpload),
            photoIds: this.getNumberArrayFormValue(formData, FormDataEnum.photoIds),
            photoIdsToDelete: this.getNumberArrayFormValue(formData, FormDataEnum.photoIdsToDelete),
            locale: this.getEnumFormValue(formData, FormDataEnum.locale)
        };
    }

    protected async callApi(validatedData: z.infer<typeof AdminVehicleSchema>): Promise<VehicleApiResult> {
        const photos = validatedData.photoFiles || [];
        const photoIds = validatedData.photoIds || [];
        const photoIdsToDelete = validatedData.photoIdsToDelete || [];

        if (photos.length !== photoIds.length) {
            throw new FindBusError({
                name: "Photos",
                errorCode: FrontendErrorEnum.UNKNOWN,
                message: "Photos must have the same length",
                url: "AdminVehicleFormAction.ts",
                statusCode: 400
            });
        }

        await VehicleService.uploadVehiclePublicPhotos({
            vehicleId: validatedData.vehicleId,
            photoFiles: photos,
            photoIds: photoIds,
            photoIdsToDelete: photoIdsToDelete
        })
    }
}