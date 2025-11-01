import {type TransportRequirementsType} from "@/src/api/openapi";
import {IStorageUploadItem, StorageUploaderService} from "@/src/singletons/StorageUploaderService";
import {UsersService} from "@/src/services/UsersService";
import {ITransportDocumentCompleteUploadItem} from "@/src/api/usersApi";

export interface IDocumentUploadItem extends IStorageUploadItem {
    type: TransportRequirementsType;
}

export class TransportRequirementsFileUploaderService {
    public static async uploadDocumentFiles(transportRequirementsId: number, documents: IDocumentUploadItem[], documentsToDelete: number[]) {
        const response = await UsersService.createUploadUrlForTransportRequirementDocuments({
            transportRequirementsId: transportRequirementsId,
            documents: documents.map(p => {
                return {
                    clientFileId: p.clientFileId,
                    fileName: p.file.name,
                    type: p.type,
                }
            })
        });

        const completeDocuments: ITransportDocumentCompleteUploadItem[] = [];
        const successfulDocumentUploads = await StorageUploaderService.UploadFiles(response.documents, documents);

        successfulDocumentUploads.forEach(uploadSasUrl => {
            const _document = documents.find(pp => pp.clientFileId === uploadSasUrl.clientFileId);
            if (_document) {
                completeDocuments.push({
                    blobName: uploadSasUrl.blobName,
                    contentType: _document.file.type,
                    fileSize: _document.file.size,
                    originalFileName: _document.file.name,
                    type: _document.type
                });
            }
        });

        await UsersService.completeUploadTransportRequirementsDocuments({
            transportRequirementsId: transportRequirementsId,
            documents: completeDocuments,
            documentIdsToDelete: documentsToDelete
        });
    }
}