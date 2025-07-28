
import {FileConverter} from "@/src/converters/file-converter";
import {TransporterRequirementsResponseDto} from "@/src/api/openapi";
import {TransportRequirements} from "@/src/data/transportRequirements";

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