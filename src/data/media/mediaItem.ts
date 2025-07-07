import {makeObservable} from "mobx";
import {Photo} from "./photo";
import {Video} from "./video";
import {ISFile, SFile} from "./SFile";
import {autowired} from "ironbean";
import {IdGenerator, IdType} from "../../singletons/id-generator";

export interface IMediaItem extends Omit<ISFile, "id"> {
    id?: number;
}

export abstract class MediaItem extends SFile {
    @autowired private _idGenerator: IdGenerator;

    protected constructor(settings: IMediaItem) {
        super({
            id: settings.id || 0,
            ...settings,
        });
        makeObservable(this);
        if (!settings.id) {
            this.id = this._idGenerator.getId(IdType.MEDIA)
        }
    }

    abstract isPhoto(): this is Photo;
    abstract isVideo(): this is Video;

    public async loadItem(..._params: any): Promise<void> {
        throw ("Load item not implemented.");
    }
}