import {
    VehicleDocumentType,
    VehiclePhotoType
} from "@/src/api/openapi";
import {generateId} from "@/src/utils/common";
import {
    IFileGroupUploaderItem
} from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {
    IDocumentUploadItem,
    IPhotoUploadItem,
    VehicleFileUploaderService
} from "@/src/singletons/VehicleFileUploaderService";
import uniq from "lodash/uniq";

export interface IPhotoItem extends IFileGroupUploaderItem {
    type: VehiclePhotoType;
}

export  interface IDocumentItem extends IFileGroupUploaderItem {
    type: VehicleDocumentType;
}

const createEmptyPhotoItem = (type: VehiclePhotoType): IPhotoItem => {
    return {
        id: generateId(),
        dbId: undefined,
        path: undefined,
        file: undefined,
        type: type
    };
}

const createEmptyDocumentItem = (type: VehicleDocumentType): IDocumentItem => {
    return {
        id: generateId(),
        dbId: undefined,
        path: undefined,
        file: undefined,
        type: type
    };
}

export const createInitPhotosState = (vehicle: Vehicle): IPhotoItem[] => {
    const _items: IPhotoItem[] = [];
    vehicle.photos.forEach(p => {
        if (p.image) {
            _items.push({
                id: p.id.toString(),
                dbId: p.id,
                path: p.image.path,
                file: p.image.file,
                type: p.type
            })
        }
    });
    _items.push(createEmptyPhotoItem(VehiclePhotoType.FRONT));
    _items.push(createEmptyPhotoItem(VehiclePhotoType.REAR));
    _items.push(createEmptyPhotoItem(VehiclePhotoType.LEFT_SIDE));
    _items.push(createEmptyPhotoItem(VehiclePhotoType.RIGHT_SIDE));
    _items.push(createEmptyPhotoItem(VehiclePhotoType.INTERIOR));
    return _items;
}

export const createInitDocuments = (vehicle: Vehicle): IDocumentItem[] => {
    const _items: IDocumentItem[] = [];
    vehicle.documents.forEach(d => {
        if (d.image) {
            _items.push({
                id: d.id.toString(),
                dbId: d.id,
                path: d.image.path,
                file: d.image.file,
                type: d.type
            })
        }
    });
    _items.push(createEmptyDocumentItem(VehicleDocumentType.INSURANCE));
    _items.push(createEmptyDocumentItem(VehicleDocumentType.TECHNICAL_CERTIFICATE));
    return _items;
}

export const uploadFiles = async (photos: IPhotoItem[], documents: IDocumentItem[], photoIdsToDelete: number[], documentIdsToDelete: number[], vehicle: Vehicle) => {
    const _photos: IPhotoUploadItem[] = [];
    const _documents: IDocumentUploadItem[] = [];
    photos.forEach(p => {
        if (p.file && p.dbId === undefined) {
            _photos.push({
                clientFileId: p.id,
                file: p.file,
                type: p.type
            })
        }
    });
    documents.forEach(d => {
        if (d.file && d.dbId === undefined) {
            _documents.push({
                clientFileId: d.id,
                file: d.file,
                type: d.type
            })
        }
    });
    await VehicleFileUploaderService.uploadVehicleFiles(vehicle.id, _photos, _documents, uniq(photoIdsToDelete), uniq(documentIdsToDelete));
}