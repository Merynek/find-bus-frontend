import {getRandomText} from "./texts/texts";
import {getRandomBoolean, getRandomEnum, getRandomId} from "./tools";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {getRandomPhoto} from "./photos/photos";
import {TransportDocument} from "@/src/data/users/transportDocument";
import {TransportRequirementStatus, TransportRequirementsType} from "@/src/api/openapi";
import {getRandomNumber} from "@/src/utils/common";
import {getRandomVerificationFeedback} from "@/dataGenerator/verificationFeedback";

export const getRandomTransportRequirements = () => {
    const documents: TransportDocument[] = [];

    for (let i = 0; i < getRandomNumber(1, 3); i++) {
        documents.push(getRandomTransportDocument());
    }
    return new TransportRequirements({
        id: getRandomId(),
        concessionNumber: getRandomText(2),
        documents: documents,
        verificationFeedback: getRandomBoolean() ? getRandomVerificationFeedback() : null,
        status: getRandomEnum(TransportRequirementStatus)
    })
}

export const getRandomTransportDocument = () => {
    return new TransportDocument({
        id: getRandomId(),
        type: getRandomEnum(TransportRequirementsType),
        image: getRandomPhoto()
    })
}
