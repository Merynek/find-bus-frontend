import {IMediaItem, MediaItem} from "./mediaItem";
import {makeObservable, observable} from "mobx";
import {autowired} from "ironbean";
import {PhotoLoadManager} from "../../singletons/photo-load-manager";
import {Configuration} from "../../singletons/configuration";
import {Video} from "./video";

export interface IPhoto extends IMediaItem {
    path?: string;
}

export class Photo extends MediaItem {
    public readonly path?: string;
    @autowired private _photoLoadManager: PhotoLoadManager;
    @autowired private _configuration: Configuration;
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
            this.displayPath = this._configuration.getResourcePath() +  this.path;
        } else if (this.file) {
            this.displayPath = await this._photoLoadManager.loadPhotoFile(this.file, 640);
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
}