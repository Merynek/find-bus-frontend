import {
    TransportDocumentResponseDto
} from "@/src/api/openapi";
import {FileConverter} from "@/src/converters/file-converter";
import {TransportDocument} from "@/src/data/users/transportDocument";

export class TransportDocumentConverter {
    public static toInstance(documentDto: TransportDocumentResponseDto): TransportDocument {
        return new TransportDocument({
            id: documentDto.id,
            image: documentDto.file ? FileConverter.toPhotoInstance(documentDto.file) : null,
            type: documentDto.type
        });
    }

    public static toJson(document: TransportDocument): TransportDocumentResponseDto {
        return {
            id: document.id,
            file: document.image ? FileConverter.photoToJson(document.image) : undefined,
            type: document.type
        }
    }
}