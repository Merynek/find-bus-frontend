import {
    EmailTemplateResponseDto
} from "../api/openapi";
import {EmailTemplate} from "../data/emailConfig";
import {EmailConfigLocalizationConverter} from "@/src/converters/email-config-localization-converter";

export class EmailTemplateConverter {
    public static toInstance(apiTemplate: EmailTemplateResponseDto): EmailTemplate {
        const params = new Map<string, string>();
        for (const [key, value] of Object.entries(apiTemplate.params)) {
            if (value) {
                params.set(key.toUpperCase(), value);
            }
        }
        return new EmailTemplate({
            type: apiTemplate.type,
            localizations: apiTemplate.localizations.map(EmailConfigLocalizationConverter.toInstance),
            params: params
        })
    }
}