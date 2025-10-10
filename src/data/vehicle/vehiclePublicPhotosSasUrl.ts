import {UploadSasUrl} from "@/src/data/vehicle/uploadSasUrl";

interface IVehiclePublicPhotosSasUrl {
    photos: UploadSasUrl[];
}

export class VehiclePublicPhotosSasUrl {
    public photos: UploadSasUrl[];

    constructor(settings: IVehiclePublicPhotosSasUrl) {
        this.photos = settings.photos;
    }
}