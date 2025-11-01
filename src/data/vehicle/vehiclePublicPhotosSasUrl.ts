import {UploadSasUrl} from "@/src/data/uploadSasUrl";

interface IVehiclePublicPhotosSasUrl {
    photos: UploadSasUrl[];
}

export class VehiclePublicPhotosSasUrl {
    public photos: UploadSasUrl[];

    constructor(settings: IVehiclePublicPhotosSasUrl) {
        this.photos = settings.photos;
    }
}