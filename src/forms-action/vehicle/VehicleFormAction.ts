import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {VehicleSchema} from "@/src/forms-action/vehicle/VehicleSchema";
import {VehicleService} from "@/src/services/VehicleService";
import {
    IVehicleDocumentRequest,
    IVehiclePhotoRequest,
    IVehicleRequest
} from "@/src/api/vehicleApi";
import {Country, PlaceRequestDto, VehicleDocumentType, VehiclePhotoType} from "@/src/api/openapi";
import {LOCALES} from "@/src/enums/locale";
import {FormActionEnum} from "@/src/enums/form-action.enum";

interface IFiles {
    frontPhoto: File|undefined;
    rearPhoto: File|undefined;
    leftSidePhoto: File|undefined;
    rightSidePhoto: File|undefined;
    interiorPhoto1: File|undefined;
    interiorPhoto2: File|undefined;
    technicalCertificate1: File|undefined;
    technicalCertificate2: File|undefined;
    insurance: File|undefined;
}

type VehicleData = Partial<IVehicleRequest & {vehicleId: number, formActionType: FormActionEnum} & IFiles & {locale: LOCALES}>;

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
            interiorPhoto1: this.getFileFormValue(formData, FormDataEnum.interiorPhoto1),
            interiorPhoto2: this.getFileFormValue(formData, FormDataEnum.interiorPhoto2),
            technicalCertificate1: this.getFileFormValue(formData, FormDataEnum.technicalCertificate1),
            technicalCertificate2: this.getFileFormValue(formData, FormDataEnum.technicalCertificate2),
            insurance: this.getFileFormValue(formData, FormDataEnum.insurance),
            locale: this.getEnumFormValue(formData, FormDataEnum.locale),
            formActionType: this.getEnumFormValue(formData, FormDataEnum.formActionType)
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
            photos: this._getVehiclePhotos(validatedData),
            documents: this._getVehicleDocuments(validatedData),
            photoIdsToDelete: [],
            documentIdsToDelete: []
        })
        if (validatedData.formActionType === FormActionEnum.SAVE_AND_VERIFY) {
            await VehicleService.sendVehicleToVerificationRequest({
                vehicleId: validatedData.vehicleId
            });
        }
    }

    private _getVehicleDocuments(validatedData: z.infer<typeof VehicleSchema>): IVehicleDocumentRequest[] {
        const documents: IVehicleDocumentRequest[] = [];

        if (validatedData.technicalCertificate1) {
            documents.push({
                type: VehicleDocumentType.TECHNICAL_CERTIFICATE,
                file: validatedData.technicalCertificate1
            });
        }
        if (validatedData.technicalCertificate2) {
            documents.push({
                type: VehicleDocumentType.TECHNICAL_CERTIFICATE,
                file: validatedData.technicalCertificate2
            });
        }
        if (validatedData.insurance) {
            documents.push({
                type: VehicleDocumentType.INSURANCE,
                file: validatedData.insurance
            });
        }
        return documents;
    }

    private _getVehiclePhotos(validatedData: z.infer<typeof VehicleSchema>): IVehiclePhotoRequest[] {
        const photos: IVehiclePhotoRequest[] = [];

        if (validatedData.frontPhoto) {
            photos.push({
                type: VehiclePhotoType.FRONT,
                file: validatedData.frontPhoto
            });
        }
        if (validatedData.rearPhoto) {
            photos.push({
                type: VehiclePhotoType.REAR,
                file: validatedData.rearPhoto
            });
        }
        if (validatedData.leftSidePhoto) {
            photos.push({
                type: VehiclePhotoType.LEFT_SIDE,
                file: validatedData.leftSidePhoto
            });
        }
        if (validatedData.rightSidePhoto) {
            photos.push({
                type: VehiclePhotoType.RIGHT_SIDE,
                file: validatedData.rightSidePhoto
            });
        }
        if (validatedData.interiorPhoto1) {
            photos.push({
                type: VehiclePhotoType.INTERIOR,
                file: validatedData.interiorPhoto1
            });
        }
        if (validatedData.interiorPhoto2) {
            photos.push({
                type: VehiclePhotoType.INTERIOR,
                file: validatedData.interiorPhoto2
            });
        }
        return photos;
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