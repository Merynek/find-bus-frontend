import {VehiclePhotoType} from "../../api/openapi";
import {Image} from "../media/Image";

interface IVehiclePhoto {
    id: number;
    isPublic: boolean;
    type: VehiclePhotoType
    file: Image|null;
}

export class VehiclePhoto {
    public id: number;
    public isPublic: boolean;
    public type: VehiclePhotoType;
    public file: Image|null;

    constructor(settings: IVehiclePhoto) {
        this.id = settings.id;
        this.isPublic = settings.isPublic;
        this.type = settings.type;
        this.file = settings.file;
    }
}