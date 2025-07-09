import {autowired} from "ironbean";
import {AdminApi} from "@/src/api/adminApi";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {makeObservable, observable} from "mobx";
import {EmailConfig, EmailConfigLocalization, EmailTemplate} from "@/src/data/emailConfig";

interface IEmailConfigPageStoreSettings {
}

export class EmailConfigPageStore {
    @autowired private _adminApi: AdminApi;
    @autowired private _configuration: AppConfiguration;
    @observable public emailConfig: EmailConfig|null;
    @observable public loader: boolean;

    constructor(settings: IEmailConfigPageStoreSettings) {
        this.emailConfig = null;
        this.loader = false;
        this.getConfigList();
        makeObservable(this);
    }

    public getConfigList = async () => {
        this.loader = true;
        this.emailConfig = await this._adminApi.getEmailConfig({})
        this.loader = false;
    }

    public updateConfig = async (template: EmailTemplate, localization: EmailConfigLocalization) => {
        this.loader = true;
        await this._adminApi.setEmailConfig({
            type: template.type,
            templateId: localization.templateId,
            language: localization.language
        });
        await this.getConfigList();
        this.loader = false;
    }
}