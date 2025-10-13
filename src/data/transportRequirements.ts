import {Image} from "./media/Image";

export interface ITransportRequirementsSettings {
    concessionNumber: string;
    concessionDocuments: Image|null;
    businessRiskInsurance: Image|null;
}

export class TransportRequirements {
    public concessionNumber: string;
    public concessionDocuments: Image|null;
    public businessRiskInsurance: Image|null;

    constructor(settings: ITransportRequirementsSettings) {
        this.concessionNumber = settings.concessionNumber;
        this.concessionDocuments = settings.concessionDocuments;
        this.businessRiskInsurance = settings.businessRiskInsurance;
    }

    public static create() {
        return new TransportRequirements({
            concessionNumber: "",
            businessRiskInsurance: null,
            concessionDocuments: null
        })
    }
}