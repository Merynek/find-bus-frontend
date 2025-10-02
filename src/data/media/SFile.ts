import type {FileType} from "@/src/api/openapi";

export interface ISFile {
    id: number;
    file?: File;
    type: FileType;
}

export abstract class SFile {
    public id: number;
    public file: File;
    public type: FileType;

    protected constructor(settings: ISFile) {
        this.id = settings.id;
        this.file = settings.file || new File([""], settings.id.toString());
        this.type = settings.type;
    }
}