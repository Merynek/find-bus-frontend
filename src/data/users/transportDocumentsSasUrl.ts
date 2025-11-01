import {UploadSasUrl} from "@/src/data/uploadSasUrl";

interface ITransportDocumentsSasUrl {
    documents: UploadSasUrl[];
}

export class TransportDocumentsSasUrl {
    public documents: UploadSasUrl[];

    constructor(settings: ITransportDocumentsSasUrl) {
        this.documents = settings.documents;
    }
}