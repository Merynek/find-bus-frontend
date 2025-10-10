import {VehiclePhotoType} from "../../api/openapi";
import {Image} from "../media/Image";

interface IVehiclePhoto {
    id: number;
    type: VehiclePhotoType
    image: Image|null;
    publicFile: Image|null;
}

export class VehiclePhoto {
    public id: number;
    public type: VehiclePhotoType;
    public image: Image|null;
    public publicFile: Image|null;

    constructor(settings: IVehiclePhoto) {
        this.id = settings.id;
        this.type = settings.type;
        this.image = settings.image;
        this.publicFile = settings.publicFile;
    }
}