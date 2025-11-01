import {
    type TransportRequirementsUploadSasUrlResponseDto
} from "@/src/api/openapi";
import {UploadSasUrlConverter} from "@/src/converters/upload-sas-url-converter";
import {TransportDocumentsSasUrl} from "@/src/data/users/transportDocumentsSasUrl";

export class TransportDocumentsSasUrlConverter {
    public static toInstance(response: TransportRequirementsUploadSasUrlResponseDto): TransportDocumentsSasUrl {
        return new TransportDocumentsSasUrl({
            documents: response.documents.map(UploadSasUrlConverter.toInstance)
        });
    }

    public static toJson(document: TransportDocumentsSasUrl): TransportRequirementsUploadSasUrlResponseDto {
        return {
            documents: document.documents.map(UploadSasUrlConverter.toJson)
        }
    }
}