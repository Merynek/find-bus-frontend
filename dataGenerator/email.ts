import {EmailConfig, EmailConfigLocalization, EmailTemplate} from "../src/data/emailConfig";
import {getRandomEnum, getRandomId} from "./tools";
import {EmailType, Language} from "../src/api/openapi";
import {getRandomNumber} from "../src/utils/common";

export function getRandomEmailConfig(): EmailConfig {
    const templates: EmailTemplate[] = [];
    for (let i = 0; i < getRandomNumber(3, 10); i++) {
        templates.push(getRandomEmailTemplate())
    }
    return new EmailConfig({
        templates: templates,
        userParams: new Map<string, string>()
    })
}

export function getRandomEmailTemplate(): EmailTemplate {
    return new EmailTemplate({
        type: getRandomEnum(EmailType),
        params: new Map<string, string>(),
        localizations: [getRandomEmailLocalizationConfig(), getRandomEmailLocalizationConfig()]
    })
}


export function getRandomEmailLocalizationConfig(): EmailConfigLocalization {
    return new EmailConfigLocalization({
        language: getRandomEnum(Language),
        templateId: getRandomId()
    })
}