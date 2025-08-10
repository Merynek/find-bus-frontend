import {Photo} from "../../data/media/photo";
import {Video, VideoType} from "../../data/media/video";
import {FileCategory, FileType} from "@/src/api/openapi";

export async function getPhotosFromFiles(files: File[]): Promise<Photo[]> {
    return new Promise<Photo[]>(async (resolve, reject) => {
        const photos: Photo[] = [];
        const imageFiles = files.filter(fileIsImage);

        for (const f of imageFiles) {
            photos.push(new Photo({
                path: "",
                type: FileType.VEHICLE_PHOTO,
                category: FileCategory.IMAGE
            }));
        }
        resolve(photos);
    });
}

export async function getVideosFromFiles(files: File[]): Promise<Video[]> {
    return new Promise<Video[]>(async (resolve, reject) => {
        const videos: Video[] = [];
        for (const file of files) {
            if (fileIsVideo(file)) {
                videos.push(new Video({
                    file: file,
                    type: VideoType.VIDEO,
                    category: FileCategory.DOCUMENT
                }));
            }
        }
        resolve(videos);
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