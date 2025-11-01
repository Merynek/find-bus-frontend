import {TransporterRequirementsResponseDto, type TransportRequirementsRequestDto} from "@/src/api/openapi";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {TransportDocumentConverter} from "@/src/converters/users/transport-document-converter";
import {VerificationFeedbackConverter} from "@/src/converters/verification-feedback-converter";

export class TransportRequirementsConverter {
    public static toInstance(response: TransporterRequirementsResponseDto): TransportRequirements {
        return new TransportRequirements({
            id: response.id,
            concessionNumber: response.concessionNumber || "",
            status: response.status,
            documents: response.documents.map(TransportDocumentConverter.toInstance),
            verificationFeedback: response.verificationFeedback ? VerificationFeedbackConverter.toInstance(response.verificationFeedback) : null
        })
    }

    public static toJson(transportRequirements: TransportRequirements): TransporterRequirementsResponseDto {
        return {
            id: transportRequirements.id,
            concessionNumber: transportRequirements.concessionNumber,
            status: transportRequirements.status,
            documents: transportRequirements.documents.map(TransportDocumentConverter.toJson),
            verificationFeedback: transportRequirements.verificationFeedback ? VerificationFeedbackConverter.toJson(transportRequirements.verificationFeedback) : undefined
        }
    }

    public static toServer(transportRequirements: TransportRequirements): TransportRequirementsRequestDto {
        return {
            concessionNumber: transportRequirements.concessionNumber
        }
    }
}