import {Priority, Semaphore} from "../utils/semaphore";
import {fileToBlob} from "../utils/file/file-base64";

export class PhotoLoadManager {
    private static _instance: PhotoLoadManager | null = null;
    private _semaphore: Semaphore;

    constructor() {
        this._semaphore = new Semaphore(5);
    }

    public static get instance(): PhotoLoadManager {
        if (!PhotoLoadManager._instance) {
            PhotoLoadManager._instance = new PhotoLoadManager();
        }
        return PhotoLoadManager._instance;
    }

    public async loadPhotoFile(file: File, size: number, priority?: Priority): Promise<string> {
        return this._semaphore.add({
            id: file.name,
            priority: priority || Priority.LOW,
            process: () => fileToBlob(file, size)
        });
    }
}