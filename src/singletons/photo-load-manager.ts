import {component} from "ironbean";
import {Priority, Semaphore} from "../utils/semaphore";
import {fileToBlob} from "../utils/file/file-base64";

@component
export class PhotoLoadManager {
    private _semaphore: Semaphore;

    constructor() {
        this._semaphore = new Semaphore(5);
    }

    public async loadPhotoFile(file: File, size: number, priority?: Priority): Promise<string> {
        return this._semaphore.add({
            id: file.name,
            priority: priority || Priority.LOW,
            process: () => fileToBlob(file, size)
        });
    }
}