import {VerificationFeedbackResponseDto} from "../api/openapi";
import {VerificationFeedback} from "@/src/data/verificationFeedback";

export class VerificationFeedbackConverter {
    public static toInstance(response: VerificationFeedbackResponseDto): VerificationFeedback {
        return new VerificationFeedback({
            created: response.created,
            description: response.description
        });
    }

    public static toJson(feedback: VerificationFeedback): VerificationFeedbackResponseDto {
        return {
            created: feedback.created,
            description: feedback.description
        }
    }
}