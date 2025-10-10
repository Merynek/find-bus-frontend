import {VehicleDocumentType, VehiclePhotoType} from "@/src/api/openapi";
import {VehicleService} from "@/src/services/VehicleService";
import {
    IDocumentCompleteUploadItem,
    IPhotoCompleteUploadItem,
    IPublicPhotoCompleteUploadItem
} from "@/src/api/vehicleApi";
import {IStorageUploadItem, StorageUploaderService} from "@/src/singletons/StorageUploaderService";

export interface IPhotoUploadItem extends IStorageUploadItem {
    type: VehiclePhotoType;
}
export interface IDocumentUploadItem extends IStorageUploadItem {
    type: VehicleDocumentType;
}
export interface IPublicPhotoUploadItem extends IStorageUploadItem {
    id: number;
}

export class VehicleFileUploaderService {
    public static async uploadVehicleFiles(vehicleId: number, photos: IPhotoUploadItem[], documents: IDocumentUploadItem[], photosToDelete: number[], documentsToDelete: number[]) {
        const response = await VehicleService.createUploadUrlForVehicleFiles({
            vehicleId: vehicleId,
            photos: photos.map(p => {
                return {
                    clientFileId: p.clientFileId,
                    fileName: p.file.name,
                    type: p.type,
                }
            }),
            documents: documents.map(p => {
                return {
                    clientFileId: p.clientFileId,
                    fileName: p.file.name,
                    type: p.type,
                }
            })
        });

        const completePhotos: IPhotoCompleteUploadItem[] = [];
        const completeDocuments: IDocumentCompleteUploadItem[] = [];
        const successfulPhotoUploads = await StorageUploaderService.UploadFiles(response.photos, photos);
        const successfulDocumentUploads = await StorageUploaderService.UploadFiles(response.documents, documents);

        successfulPhotoUploads.forEach(uploadSasUrl => {
            const _photo = photos.find(pp => pp.clientFileId === uploadSasUrl.clientFileId);
            if (_photo) {
                completePhotos.push({
                    blobName: uploadSasUrl.blobName,
                    contentType: _photo.file.type,
                    fileSize: _photo.file.size,
                    originalFileName: _photo.file.name,
                    type: _photo.type
                });
            }
        });

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

        await VehicleService.completeUploadVehicleFiles({
            vehicleId: vehicleId,
            photos: completePhotos,
            documents: completeDocuments,
            documentIdsToDelete: documentsToDelete,
            photoIdsToDelete: photosToDelete
        });
    }

    public static async uploadPublicVehiclePhotos(vehicleId: number, photos: IPublicPhotoUploadItem[], photosToDelete: number[]) {
        const response = await VehicleService.createPublicUploadUrlForVehiclePhotos({
            vehicleId: vehicleId,
            photos: photos.map(p => {
                return {
                    clientFileId: p.clientFileId,
                    fileName: p.file.name,
                    id: p.id
                }
            })
        });

        const completePhotos: IPublicPhotoCompleteUploadItem[] = [];
        const successfulPhotoUploads = await StorageUploaderService.UploadFiles(response.photos, photos);

        successfulPhotoUploads.forEach(uploadSasUrl => {
            const _photo = photos.find(pp => pp.clientFileId === uploadSasUrl.clientFileId);
            if (_photo) {
                completePhotos.push({
                    blobName: uploadSasUrl.blobName,
                    contentType: _photo.file.type,
                    fileSize: _photo.file.size,
                    originalFileName: _photo.file.name,
                    id: _photo.id
                });
            }
        });

        await VehicleService.completePublicUploadVehiclePhotos({
            vehicleId: vehicleId,
            photos: completePhotos,
            photoIdsToDelete: photosToDelete
        });
    }
}