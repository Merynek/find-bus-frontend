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
    IPhotoUploadItem, IPublicPhotoUploadItem,
    VehicleFileUploaderService
} from "@/src/singletons/VehicleFileUploaderService";
import uniq from "lodash/uniq";

export interface IPhotoItem extends IFileGroupUploaderItem {
    type: VehiclePhotoType;
}

export interface IDocumentItem extends IFileGroupUploaderItem {
    type: VehicleDocumentType;
}

export interface IPublicPhotoItem extends IFileGroupUploaderItem {
    originalId: number;
}

export const createEmptyPhotoItem = (type: VehiclePhotoType): IPhotoItem => {
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

export const createEmptyPublicPhotoItem = (id: number): IFileGroupUploaderItem => {
    return {
        id: id.toString(),
        dbId: undefined,
        path: undefined,
        file: undefined
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

export const createInitPublicPhotosState = (vehicle: Vehicle): IPublicPhotoItem[] => {
    const _items: IPublicPhotoItem[] = [];
    vehicle.photos.forEach(p => {
        if (p.publicFile) {
            _items.push({
                id: p.id.toString(),
                dbId: p.id,
                path: p.publicFile.path,
                file: p.publicFile.file,
                originalId: p.id,
            })
        }
    });
    return _items;
}

export const uploadFiles = async (photos: IPhotoItem[], documents: IDocumentItem[], photoIdsToDelete: number[], documentIdsToDelete: number[], vehicleId: number) => {
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
    await VehicleFileUploaderService.uploadVehicleFiles(vehicleId, _photos, _documents, uniq(photoIdsToDelete), uniq(documentIdsToDelete));
}

export const uploadPublicPhotos = async (photos: IPublicPhotoItem[], photoIdsToDelete: number[], vehicle: Vehicle) => {
    const _photos: IPublicPhotoUploadItem[] = [];
    photos.forEach(p => {
        if (p.file && p.dbId === undefined) {
            _photos.push({
                clientFileId: p.id,
                file: p.file,
                id: p.originalId
            })
        }
    });
    await VehicleFileUploaderService.uploadPublicVehiclePhotos(vehicle.id, _photos, uniq(photoIdsToDelete));
}