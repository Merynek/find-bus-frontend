import {EmailType, Languages} from "../api/openapi";

export interface IEmailConfigSettings {
    userParams: Map<string, string>;
    templates: EmailTemplate[];
}

export class EmailConfig {
    public templates: EmailTemplate[];
    public userParams: Map<string, string>;

    constructor(settings: IEmailConfigSettings) {
        this.templates = settings.templates;
        this.userParams = settings.userParams;
    }
}

export interface IEmailTemplateSettings {
    type: EmailType;
    localizations: EmailConfigLocalization[];
    params: Map<string, string>;
}
export class EmailTemplate {
    public type: EmailType;
    public localizations: EmailConfigLocalization[];
    public params: Map<string, string>;

    constructor(settings: IEmailTemplateSettings) {
        this.type = settings.type;
        this.localizations = settings.localizations;
        this.params = settings.params;
    }
}

interface IEmailConfigLocalization {
    language: Languages;
    templateId: number;
}

export class EmailConfigLocalization {
    public language: Languages;
    public templateId: number;

    constructor(settings: IEmailConfigLocalization) {
        this.language = settings.language;
        this.templateId = settings.templateId;
    }
}