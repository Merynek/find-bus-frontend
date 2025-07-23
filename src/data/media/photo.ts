import {IMediaItem, MediaItem} from "./mediaItem";
import {makeObservable, observable} from "mobx";
import {PhotoLoadManager} from "../../singletons/photo-load-manager";
import {AppConfiguration} from "../../singletons/AppConfiguration";
import {Video} from "./video";
import {PhotoResponseDto} from "@/src/api/openapi";

export interface IPhoto extends IMediaItem {
    path?: string;
}

export class Photo extends MediaItem {
    public readonly path?: string;
    @observable public displayPath: string = "";
    @observable public photoLoaded: boolean;

    constructor(settings: IPhoto) {
        super(settings);
        this.path = settings.path;
        makeObservable(this);
    }

    public async loadItem() {
        if (this.path) {
            // convert
            this.displayPath = AppConfiguration.instance.getResourcePath() +  this.path;
        } else if (this.file) {
            this.displayPath = await PhotoLoadManager.instance.loadPhotoFile(this.file, 640);
        } else {
            throw new Error(`Photo without data.`);
        }
        this.photoLoaded = true;
    }

    isPhoto(): this is Photo {
        return true;
    }

    isVideo(): this is Video {
        return false;
    }

    public toJson(): PhotoResponseDto {
        return {
            id: this.id,
            path: this.path || ""
        }
    }
}