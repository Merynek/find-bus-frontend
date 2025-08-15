import { computed, observable, makeObservable } from "mobx";
import type {FileCategory} from "@/src/api/openapi";

export enum FileUploadState {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    ABORTED = "ABORTED"
}

export interface ISFile {
    id: number;
    file?: File;
    uploadState?: FileUploadState;
    onChange?: () => void;
    onUploadDone?: () => void;
    category: FileCategory;
}

export abstract class SFile {
    public id: number;
    public file: File;
    public fileCategory: FileCategory;
    @observable public uploadState: FileUploadState;
    @observable public isLoaded: boolean;
    private _uploadFnc: () => void;
    private _abortUploadFnc: () => void;
    private _onUploadDone: () => void;

    protected constructor(settings: ISFile) {
        this.id = settings.id;
        this.file = settings.file || new File([""], this.id.toString());
        this.uploadState = settings.uploadState || FileUploadState.PENDING;
        this.fileCategory = settings.category;
        this.isLoaded = false;
        this._uploadFnc = () => {};
        this._abortUploadFnc = () => {};
        this._onUploadDone = () => {};
        makeObservable(this);
    }

    @computed
    get isProcessing(): boolean {
        return this.uploadState === FileUploadState.IN_PROGRESS || this.uploadState === FileUploadState.PENDING;
    }

    set uploadFnc(fnc: () => void) {
        this._uploadFnc = fnc;
    }

    set abortUploadFnc(fnc: () => void) {
        this._abortUploadFnc = fnc;
    }

    public upload() {
        this._uploadFnc();
    }

    public abortUpload() {
        this._abortUploadFnc();
    }

    public uploadDone() {
        this._onUploadDone();
    }

    public onUploadDone(fnc: () => void) {
        this._onUploadDone = fnc;
    }
}