import {TransportDocument} from "@/src/data/users/transportDocument";
import {TransportRequirementStatus} from "@/src/api/openapi";
import {VerificationFeedback} from "@/src/data/verificationFeedback";

export interface ITransportRequirementsSettings {
    id: number;
    concessionNumber: string;
    status: TransportRequirementStatus;
    documents: TransportDocument[];
    verificationFeedback: VerificationFeedback|null;
}

export class TransportRequirements {
    public id: number;
    public concessionNumber: string;
    public status: TransportRequirementStatus;
    public documents: TransportDocument[];
    public verificationFeedback: VerificationFeedback|null;

    constructor(settings: ITransportRequirementsSettings) {
        this.id = settings.id;
        this.concessionNumber = settings.concessionNumber;
        this.status = settings.status;
        this.documents = settings.documents;
        this.verificationFeedback = settings.verificationFeedback;
    }

    public static create() {
        return new TransportRequirements({
            id: 0,
            concessionNumber: "",
            status: TransportRequirementStatus.DRAFT,
            documents: [],
            verificationFeedback: null
        })
    }
}