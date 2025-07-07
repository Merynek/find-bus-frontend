import {IMediaItem, MediaItem} from "./mediaItem";
import { computed, makeObservable } from "mobx";
import {Photo} from "./photo";

export enum VideoType {
    VIDEO = 'VIDEO',
    YOUTUBE_VIDEO = 'YOUTUBE_VIDEO'
}

export interface IVideo extends IMediaItem {
    type: VideoType;
    youtubeId?: string;
    path?: string;
}

export class Video extends MediaItem {
    protected _path?: string;
    private _youtubeId?: string;
    public type: VideoType;

    constructor(settings: IVideo) {
        super(settings);
        makeObservable(this);
        this._youtubeId = settings.youtubeId;
        this._path = settings.path;
        this.type = settings.type;
    }

    get youtubeId(): string|undefined {
        return this._youtubeId;
    }

    set youtubeId(id: string|undefined) {
        this._youtubeId = id;
    }

    get path(): string | undefined {
        return this._path;
    }

    @computed
    get isYoutube() {
        return this.type === VideoType.YOUTUBE_VIDEO;
    }

    isPhoto(): this is Photo {
        return false;
    }

    isVideo(): this is Video {
        return true;
    }
}