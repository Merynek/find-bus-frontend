import {VehicleDocumentType, VehiclePhotoType} from "@/src/api/openapi";
import {VehicleService} from "@/src/services/VehicleService";
import {IDocumentCompleteUploadItem, IPhotoCompleteUploadItem} from "@/src/api/vehicleApi";

export interface IPhotoUploadItem {
    clientFileId: string;
    file: File;
    type: VehiclePhotoType;
}
export interface IDocumentUploadItem {
    clientFileId: string;
    file: File;
    type: VehicleDocumentType;
}

export class FileUploaderService {
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
        // TODO  upload files to storage

        const completePhotos: IPhotoCompleteUploadItem[] = [];
        const completeDocuments: IDocumentCompleteUploadItem[] = [];

        response.photos.forEach(p => {
            const _photo = photos.find(pp => pp.clientFileId === p.clientFileId);
            if (_photo) {
                completePhotos.push({
                    blobName: p.blobName,
                    contentType: _photo.file.type,
                    fileSize: _photo.file.size,
                    originalFileName: _photo.file.name,
                    type: _photo.type
                })
            }
        });

        response.documents.forEach(p => {
            const _document = documents.find(pp => pp.clientFileId === p.clientFileId);
            if (_document) {
                completeDocuments.push({
                    blobName: p.blobName,
                    contentType: _document.file.type,
                    fileSize: _document.file.size,
                    originalFileName: _document.file.name,
                    type: _document.type
                })
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
}