import {EmailConfigLocalizationResponseDto} from "@/src/api/openapi";
import {EmailConfigLocalization} from "@/src/data/emailConfig";

export class EmailConfigLocalizationConverter {
    public static toInstance(response: EmailConfigLocalizationResponseDto): EmailConfigLocalization {
        return new EmailConfigLocalization({
            language: response.language,
            templateId: response.templateId
        })
    }
}