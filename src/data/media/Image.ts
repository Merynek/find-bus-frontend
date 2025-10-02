import {FileStorageCategory} from "@/src/api/openapi";
import {ISFile, SFile} from "@/src/data/media/SFile";

export interface IImage extends ISFile {
    path: string;
    storageCategory: FileStorageCategory;
}

export class Image extends SFile {
    public readonly path: string;
    public storageCategory: FileStorageCategory;

    constructor(settings: IImage) {
        super(settings);
        this.path = settings.path;
        this.storageCategory = settings.storageCategory;
    }
}