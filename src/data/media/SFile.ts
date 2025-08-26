import type {FileCategory} from "@/src/api/openapi";

export interface ISFile {
    id: number;
    file?: File;
    category: FileCategory;
}

export abstract class SFile {
    public id: number;
    public file: File;
    public fileCategory: FileCategory;

    protected constructor(settings: ISFile) {
        this.id = settings.id;
        this.file = settings.file || new File([""], settings.id.toString());
        this.fileCategory = settings.category;
    }
}