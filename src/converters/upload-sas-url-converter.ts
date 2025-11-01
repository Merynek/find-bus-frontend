import {type UploadSasUrlResponseDto} from "../api/openapi";
import {UploadSasUrl} from "@/src/data/uploadSasUrl";

export class UploadSasUrlConverter {
    public static toInstance(response: UploadSasUrlResponseDto): UploadSasUrl {
        return new UploadSasUrl({
            clientFileId: response.clientFileId,
            uploadUrl: response.uploadUrl,
            blobName: response.blobName
        });
    }

    public static toJson(instance: UploadSasUrl): UploadSasUrlResponseDto {
        return {
            blobName: instance.blobName,
            clientFileId: instance.clientFileId,
            uploadUrl: instance.uploadUrl
        }
    }
}