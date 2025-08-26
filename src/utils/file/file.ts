import {Image} from "../../data/media/Image";
import {FileCategory, FileType} from "@/src/api/openapi";
import {getRandomId} from "@/dataGenerator/tools";

export async function getPhotosFromFiles(files: File[]): Promise<Image[]> {
    return new Promise<Image[]>(async (resolve) => {
        const photos: Image[] = [];
        const imageFiles = files.filter(fileIsImage);

        for (const f of imageFiles) {
            const fileUrl = URL.createObjectURL(f);
            photos.push(new Image({
                id: getRandomId(),
                path: fileUrl,
                type: FileType.VEHICLE_PHOTO,
                category: FileCategory.IMAGE
            }));
        }
        resolve(photos);
    });
}

export function getImageFileRegEx() {
    return "image.*";
}

export function getVideoFileRegEx() {
    return "video.*";
}

export function fileIsImage(file: File) {
    const type = file.type;

    return type.match(getImageFileRegEx());
}

export function fileIsVideo(file: File) {
    const type = file.type;

    return type.match(getVideoFileRegEx());
}