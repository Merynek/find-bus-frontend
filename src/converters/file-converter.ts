import {FileResponseDto} from "../api/openapi";
import {Image} from "@/src/data/media/Image";

export class FileConverter {
    public static toPhotoInstance(file: FileResponseDto): Image {
        return new Image({
            id: file.id,
            path: file.path,
            type: file.type,
            storageCategory: file.storageCategory
        });
    }

    public static photoToJson(photo: Image): FileResponseDto {
        return {
            id: photo.id,
            path: photo.path,
            type: photo.type,
            storageCategory: photo.storageCategory
        }
    }
}