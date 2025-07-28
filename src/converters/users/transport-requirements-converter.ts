import {
    TransporterRequirementsResponseDto
} from "../api/openapi";
import {TransportRequirements} from "../data/transportRequirements";
import {FileConverter} from "@/src/converters/file-converter";

export class TransportRequirementsConverter {
    public static toInstance(response: TransporterRequirementsResponseDto): TransportRequirements {
        return new TransportRequirements({
            concessionNumber: response.concessionNumber || "",
            businessRiskInsurance: response.businessRiskInsurance ? FileConverter.toPhotoInstance(response.businessRiskInsurance) : null,
            concessionDocuments: response.concessionDocuments ? FileConverter.toPhotoInstance(response.concessionDocuments) : null,
        })
    }

    public static toJson(transportRequirements: TransportRequirements): TransporterRequirementsResponseDto {
        return {
            concessionNumber: transportRequirements.concessionNumber,
            businessRiskInsurance: transportRequirements.businessRiskInsurance ? FileConverter.photoToJson(transportRequirements.businessRiskInsurance) : undefined,
            concessionDocuments: transportRequirements.concessionDocuments ? FileConverter.photoToJson(transportRequirements.concessionDocuments) : undefined
        }
    }
}