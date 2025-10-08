import {FileConverter} from "@/src/converters/file-converter";
import {VehiclePhoto} from "@/src/data/vehicle/vehiclePhoto";
import {VehiclePhotoResponseDto} from "@/src/api/openapi";

export class VehiclePhotoConverter {
    public static toInstance(photoDto: VehiclePhotoResponseDto): VehiclePhoto {
        return new VehiclePhoto({
            id: photoDto.id,
            file: photoDto.file ? FileConverter.toPhotoInstance(photoDto.file) : null,
            publicFile: photoDto.publicFile ? FileConverter.toPhotoInstance(photoDto.publicFile) : null,
            type: photoDto.type
        });
    }

    public static toJson(vehiclePhoto: VehiclePhoto): VehiclePhotoResponseDto {
        return {
            id: vehiclePhoto.id,
            file: vehiclePhoto.file ? FileConverter.photoToJson(vehiclePhoto.file) : undefined,
            publicFile: vehiclePhoto.publicFile ? FileConverter.photoToJson(vehiclePhoto.publicFile) : undefined,
            type: vehiclePhoto.type
        }
    }
}