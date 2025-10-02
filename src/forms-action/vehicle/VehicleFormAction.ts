import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {VehicleSchema} from "@/src/forms-action/vehicle/VehicleSchema";
import {VehicleService} from "@/src/services/VehicleService";
import {IUploadVehicleFilesRequest, IVehicleRequest} from "@/src/api/vehicleApi";
import {Country, PlaceRequestDto} from "@/src/api/openapi";
import {LOCALES} from "@/src/enums/locale";

type VehicleData = Partial<IVehicleRequest & {vehicleId: number} & IUploadVehicleFilesRequest & {locale: LOCALES}>;

type VehicleApiResult = void;

export class VehicleFormAction extends BaseFormAction<typeof VehicleSchema, VehicleData, VehicleApiResult> {

    constructor() {
        super(VehicleSchema);
    }

    protected createDataFromFormData(formData: FormData): VehicleData {
        const stkExpired = this.getStringFormValue(formData, FormDataEnum.stkExpired);
        return {
            vehicleId: this.getNumberFormValue(formData, FormDataEnum.vehicleId),
            name: this.getStringFormValue(formData, FormDataEnum.name),
            personsCapacity: this.getNumberFormValue(formData, FormDataEnum.personsCapacity),
            euro: this.getEnumFormValue(formData, FormDataEnum.euro),
            amenities: this.getEnumArrayFormValue(formData, FormDataEnum.amenities),
            handicappedUserCount: this.getNumberFormValue(formData, FormDataEnum.handicappedUserCount),
            vin: this.getStringFormValue(formData, FormDataEnum.vin),
            registrationSign: this.getStringFormValue(formData, FormDataEnum.registrationSign),
            stkExpired: stkExpired ? new Date(stkExpired) : undefined,
            yearOfManufacture: this.getNumberFormValue(formData, FormDataEnum.yearOfManufacture),
            departureStation: this._getDepartureStation(formData),
            frontPhoto: this.getFileFormValue(formData, FormDataEnum.frontPhoto),
            rearPhoto: this.getFileFormValue(formData, FormDataEnum.rearPhoto),
            leftSidePhoto: this.getFileFormValue(formData, FormDataEnum.leftSidePhoto),
            rightSidePhoto: this.getFileFormValue(formData, FormDataEnum.rightSidePhoto),
            interierPhoto1: this.getFileFormValue(formData, FormDataEnum.interierPhoto1),
            interierPhoto2: this.getFileFormValue(formData, FormDataEnum.interierPhoto2),
            technicalCertificate1: this.getFileFormValue(formData, FormDataEnum.technicalCertificate1),
            technicalCertificate2: this.getFileFormValue(formData, FormDataEnum.technicalCertificate2),
            insurance: this.getFileFormValue(formData, FormDataEnum.insurance),
            locale: this.getEnumFormValue(formData, FormDataEnum.locale),
        };
    }

    protected async callApi(validatedData: z.infer<typeof VehicleSchema>): Promise<VehicleApiResult> {
        await VehicleService.updateVehicle({
            vehicleId: validatedData.vehicleId,
            vehicle: {
                name: validatedData.name,
                personsCapacity: validatedData.personsCapacity,
                euro: validatedData.euro,
                amenities: validatedData.amenities,
                handicappedUserCount: validatedData.handicappedUserCount,
                vin: validatedData.vin,
                registrationSign: validatedData.registrationSign,
                stkExpired: validatedData.stkExpired,
                yearOfManufacture: validatedData.yearOfManufacture,
                departureStation: validatedData.departureStation
            }
        });
        await VehicleService.uploadVehicleFiles({
            vehicleId: validatedData.vehicleId,
            frontPhoto: validatedData.frontPhoto || undefined,
            rearPhoto: validatedData.rearPhoto || undefined,
            leftSidePhoto: validatedData.leftSidePhoto || undefined,
            rightSidePhoto: validatedData.rightSidePhoto || undefined,
            interierPhoto1: validatedData.interierPhoto1 || undefined,
            interierPhoto2: validatedData.interierPhoto2 || undefined,
            technicalCertificate1: validatedData.technicalCertificate1 || undefined,
            technicalCertificate2: validatedData.technicalCertificate2 || undefined,
            insurance: validatedData.insurance || undefined
        })
    }

    private _getDepartureStation(formData: FormData): PlaceRequestDto|undefined {
        const placeId = this.getStringFormValue(formData, FormDataEnum.departureStation_placeId);
        const pointLat = this.getNumberFormValue(formData, FormDataEnum.departureStation_point_lat);
        const pointLng = this.getNumberFormValue(formData, FormDataEnum.departureStation_point_lng);
        const country = this.getEnumFormValue<Country>(formData, FormDataEnum.departureStation_country);
        const name = this.getStringFormValue(formData, FormDataEnum.departureStation_name);
        const placeFormatted = this.getStringFormValue(formData, FormDataEnum.departureStation_placeFormatted);

        if (placeId && pointLat && pointLng && country && name && placeFormatted) {
            return {
                placeId: placeId,
                point: {
                    lat: pointLat,
                    lng: pointLng
                },
                country: country,
                name: name,
                placeFormatted: placeFormatted
            }
        }
        return undefined;
    }
}