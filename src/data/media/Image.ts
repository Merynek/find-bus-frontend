import {type FileType} from "@/src/api/openapi";
import {ISFile, SFile} from "@/src/data/media/SFile";

export interface IImage extends ISFile {
    path: string;
    type: FileType;
}

export class Image extends SFile {
    public readonly path: string;
    public type: FileType;

    constructor(settings: IImage) {
        super(settings);
        this.path = settings.path;
        this.type = settings.type;
    }
}