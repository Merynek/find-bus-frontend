import {computed, makeObservable, observable} from "mobx";
import {Photo} from "./media/photo";
import {TransporterRequirementsResponseDto} from "@/src/api/openapi";

export interface ITransportRequirementsSettings {
    concessionNumber: string;
    concessionDocuments: Photo|null;
    businessRiskInsurance: Photo|null;
}

export class TransportRequirements {
    @observable public concessionNumber: string;
    @observable public concessionDocuments: Photo|null;
    @observable public businessRiskInsurance: Photo|null;

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

    public toJson(): TransporterRequirementsResponseDto {
        return {
            concessionNumber: this.concessionNumber,
            businessRiskInsurance: this.businessRiskInsurance ? this.businessRiskInsurance.toJson() : undefined,
            concessionDocuments: this.concessionDocuments ? this.concessionDocuments.toJson() : undefined
        }
    }
}