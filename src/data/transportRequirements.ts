import {computed, makeObservable, observable} from "mobx";
import {Image} from "./media/Image";

export interface ITransportRequirementsSettings {
    concessionNumber: string;
    concessionDocuments: Image|null;
    businessRiskInsurance: Image|null;
}

export class TransportRequirements {
    @observable public concessionNumber: string;
    @observable public concessionDocuments: Image|null;
    @observable public businessRiskInsurance: Image|null;

    constructor(settings: ITransportRequirementsSettings) {
        this.concessionNumber = settings.concessionNumber;
        this.concessionDocuments = settings.concessionDocuments;
        this.businessRiskInsurance = settings.businessRiskInsurance;
        makeObservable(this);
    }

    @computed
    get isValid(): boolean {
        return Boolean(this.concessionNumber) && this.concessionDocuments !== null && this.businessRiskInsurance !== null;
    }

    public static create() {
        return new TransportRequirements({
            concessionNumber: "",
            businessRiskInsurance: null,
            concessionDocuments: null
        })
    }
}