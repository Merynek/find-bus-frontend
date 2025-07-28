import {IMediaItem, MediaItem} from "./mediaItem";
import {Video} from "./video";
import {type FileType} from "@/src/api/openapi";

export interface IPhoto extends IMediaItem {
    path: string;
    type: FileType;
}

export class Photo extends MediaItem {
    public readonly path: string;
    public type: FileType;

    constructor(settings: IPhoto) {
        super(settings);
        this.path = settings.path;
        this.type = settings.type;
    }

    isPhoto(): this is Photo {
        return true;
    }

    isVideo(): this is Video {
        return false;
    }
}