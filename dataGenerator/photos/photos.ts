import {photos} from "./photos_db";
import {getRandomEnum, shuffleArray} from "../tools";
import {Photo} from "../../src/data/media/photo";
import {FileUploadState} from "../../src/data/media/SFile";

export function getRandomPhoto(): Photo {
    const photo = photos[Math.floor(Math.random() * photos.length)];
    return new Photo({
        path: photo,
        uploadState: getRandomEnum(FileUploadState),
    });
}

export function getAllPhotos(): Photo[] {
    const shuffledPhotos = shuffleArray(photos);
    return shuffledPhotos.map(photo => {
        return new Photo({
            path: photo,
            uploadState: getRandomEnum(FileUploadState)
        });
    })
}