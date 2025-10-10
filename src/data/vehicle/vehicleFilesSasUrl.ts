import {UploadSasUrl} from "@/src/data/vehicle/uploadSasUrl";

interface IVehicleFilesSasUrl {
    photos: UploadSasUrl[];
    documents: UploadSasUrl[];
}

export class VehicleFilesSasUrl {
    public photos: UploadSasUrl[];
    public documents: UploadSasUrl[];

    constructor(settings: IVehicleFilesSasUrl) {
        this.photos = settings.photos;
        this.documents = settings.documents;
    }
}