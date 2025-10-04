import {VehicleDocumentType} from "../../api/openapi";
import {Image} from "../media/Image";

interface IVehicleDocument {
    id: number;
    type: VehicleDocumentType
    file: Image|null;
}

export class VehicleDocument {
    public id: number;
    public type: VehicleDocumentType;
    public file: Image|null;

    constructor(settings: IVehicleDocument) {
        this.id = settings.id;
        this.type = settings.type;
        this.file = settings.file;
    }
}