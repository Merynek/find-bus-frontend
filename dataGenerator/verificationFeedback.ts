import {getRandomText} from "./texts/texts";
import {getRandomDate} from "./time";
import {VerificationFeedback} from "@/src/data/verificationFeedback";

export function getRandomVerificationFeedback(): VerificationFeedback {
    return new VerificationFeedback({
        created: getRandomDate(),
        description: getRandomText(1)
    })
}