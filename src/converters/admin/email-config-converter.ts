import {
    EmailConfigResponseDto
} from "../api/openapi";
import {EmailConfig} from "../data/emailConfig";
import {UserAdminDetailConverter} from "@/src/converters/user-admin-detail-converter";

export class EmailConfigConverter {
    public static toInstance(response: EmailConfigResponseDto): EmailConfig {
        const userParams = new Map<string, string>();
        for (const [key, value] of Object.entries(response.userParams)) {
            if (value) {
                userParams.set(key, value);
            }
        }
        return new EmailConfig({
            templates: response.templates.map(UserAdminDetailConverter.emailTemplateToClient),
            userParams: userParams
        })
    }
}