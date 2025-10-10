import {UploadVehicleFilesSasUrlResponseDto} from "@/src/api/openapi";
import {VehicleFilesSasUrl} from "@/src/data/vehicle/vehicleFilesSasUrl";
import {UploadSasUrlConverter} from "@/src/converters/upload-sas-url-converter";

export class VehicleFilesSasUrlConverter {
    public static toInstance(response: UploadVehicleFilesSasUrlResponseDto): VehicleFilesSasUrl {
        return new VehicleFilesSasUrl({
            photos: response.photos.map(UploadSasUrlConverter.toInstance),
            documents: response.documents.map(UploadSasUrlConverter.toInstance)
        });
    }

    public static toJson(vehiclePhoto: VehicleFilesSasUrl): UploadVehicleFilesSasUrlResponseDto {
        return {
            photos: vehiclePhoto.photos.map(UploadSasUrlConverter.toJson),
            documents: vehiclePhoto.documents.map(UploadSasUrlConverter.toJson)
        }
    }
}