import {EmailConfigResponseDto} from "@/src/api/openapi";
import {EmailConfig} from "@/src/data/emailConfig";
import {EmailTemplateConverter} from "@/src/converters/admin/email-template-converter";

export class EmailConfigConverter {
    public static toInstance(response: EmailConfigResponseDto): EmailConfig {
        const userParams = new Map<string, string>();
        for (const [key, value] of Object.entries(response.userParams)) {
            if (value) {
                userParams.set(key, value);
            }
        }
        return new EmailConfig({
            templates: response.templates.map(EmailTemplateConverter.toInstance),
            userParams: userParams
        })
    }
}