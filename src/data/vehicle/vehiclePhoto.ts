import {VehiclePhotoType} from "../../api/openapi";
import {Image} from "../media/Image";

interface IVehiclePhoto {
    id: number;
    type: VehiclePhotoType
    file: Image|null;
    publicFile: Image|null;
}

export class VehiclePhoto {
    public id: number;
    public type: VehiclePhotoType;
    public file: Image|null;
    public publicFile: Image|null;

    constructor(settings: IVehiclePhoto) {
        this.id = settings.id;
        this.type = settings.type;
        this.file = settings.file;
        this.publicFile = settings.publicFile;
    }
}