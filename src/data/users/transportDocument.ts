import {type TransportRequirementsType} from "../../api/openapi";
import {Image} from "../media/Image";

interface ITransportDocument {
    id: number;
    type: TransportRequirementsType
    image: Image|null;
}

export class TransportDocument {
    public id: number;
    public type: TransportRequirementsType;
    public image: Image|null;

    constructor(settings: ITransportDocument) {
        this.id = settings.id;
        this.type = settings.type;
        this.image = settings.image;
    }
}