import {FileResponseDto} from "../api/openapi";
import {Photo} from "@/src/data/media/photo";

export class FileConverter {
    public static toPhotoInstance(file: FileResponseDto): Photo {
        return new Photo({
            id: file.id,
            path: file.path,
            type: file.type,
            category: file.category
        });
    }

    public static photoToJson(photo: Photo): FileResponseDto {
        return {
            id: photo.id,
            path: photo.path,
            type: photo.type,
            category: photo.fileCategory
        }
    }
}