interface IUploadSasUrl {
    clientFileId: string;
    uploadUrl: string;
    blobName: string;
}

export class UploadSasUrl {
    public clientFileId: string;
    public uploadUrl: string;
    public blobName: string;

    constructor(settings: IUploadSasUrl) {
        this.clientFileId = settings.clientFileId;
        this.uploadUrl = settings.uploadUrl;
        this.blobName = settings.blobName;
    }
}