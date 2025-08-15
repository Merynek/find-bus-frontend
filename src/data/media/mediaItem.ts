import {makeObservable} from "mobx";
import {Photo} from "./photo";
import {Video} from "./video";
import {ISFile, SFile} from "./SFile";
import {IdGenerator, IdType} from "../../singletons/id-generator";

export interface IMediaItem extends Omit<ISFile, "id"> {
    id?: number;
}

export abstract class MediaItem extends SFile {
    protected constructor(settings: IMediaItem) {
        super({
            id: settings.id || 0,
            ...settings,
        });
        if (!settings.id) {
            this.id = IdGenerator.instance.getId(IdType.MEDIA)
        }
        makeObservable(this);
    }

    abstract isPhoto(): this is Photo;
    abstract isVideo(): this is Video;
}