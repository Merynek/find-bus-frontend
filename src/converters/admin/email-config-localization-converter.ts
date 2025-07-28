import {
    EmailConfigLocalizationResponseDto
} from "../api/openapi";
import {EmailConfigLocalization} from "../data/emailConfig";

export class EmailConfigLocalizationConverter {
    public static toInstance(response: EmailConfigLocalizationResponseDto): EmailConfigLocalization {
        return new EmailConfigLocalization({
            language: response.language,
            templateId: response.templateId
        })
    }
}