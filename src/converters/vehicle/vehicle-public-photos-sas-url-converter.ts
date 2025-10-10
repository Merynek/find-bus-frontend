import {UploadSasUrlConverter} from "@/src/converters/upload-sas-url-converter";
import {VehiclePublicPhotosSasUrl} from "@/src/data/vehicle/vehiclePublicPhotosSasUrl";
import {VehiclePublicUploadSasUrlResponseDto} from "@/src/api/openapi";

export class VehiclePublicPhotosSasUrlConverter {
    public static toInstance(response: VehiclePublicUploadSasUrlResponseDto): VehiclePublicPhotosSasUrl {
        return new VehiclePublicPhotosSasUrl({
            photos: response.photos.map(UploadSasUrlConverter.toInstance)
        });
    }

    public static toJson(vehiclePhoto: VehiclePublicPhotosSasUrl): VehiclePublicUploadSasUrlResponseDto {
        return {
            photos: vehiclePhoto.photos.map(UploadSasUrlConverter.toJson)
        }
    }
}