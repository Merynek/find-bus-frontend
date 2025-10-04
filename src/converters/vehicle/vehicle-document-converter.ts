import {FileConverter} from "@/src/converters/file-converter";
import {VehicleDocumentResponseDto} from "@/src/api/openapi";
import { VehicleDocument } from "@/src/data/vehicle/vehicleDocument";

export class VehicleDocumentConverter {
    public static toInstance(documentDto: VehicleDocumentResponseDto): VehicleDocument {
        return new VehicleDocument({
            id: documentDto.id,
            file: documentDto.file ? FileConverter.toPhotoInstance(documentDto.file) : null,
            type: documentDto.type
        });
    }

    public static toJson(vehicleDocument: VehicleDocument): VehicleDocumentResponseDto {
        return {
            id: vehicleDocument.id,
            file: vehicleDocument.file ? FileConverter.photoToJson(vehicleDocument.file) : undefined,
            type: vehicleDocument.type
        }
    }
}