import {photos} from "./photos_db";
import {getRandomEnum, getRandomId, shuffleArray} from "../tools";
import {Image} from "@/src/data/media/Image";
import {FileCategory, FileType} from "@/src/api/openapi";

export function getRandomPhoto(): Image {
    const photo = photos[Math.floor(Math.random() * photos.length)];
    return new Image({
        id: getRandomId(),
        path: photo,
        type: getRandomEnum(FileType),
        category: getRandomEnum(FileCategory),
    });
}

export function getAllPhotos(): Image[] {
    const shuffledPhotos = shuffleArray(photos);
    return shuffledPhotos.map((photo, index) => {
        return new Image({
            id: index,
            path: photo,
            type: getRandomEnum(FileType),
            category: getRandomEnum(FileCategory),
        });
    })
}