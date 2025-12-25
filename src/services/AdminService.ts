import {EmailConfig} from "@/src/data/emailConfig";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {
    changeAppBusinessConfig,
    getAppBusinessConfig,
    getEmailConfig,
    setEmailConfig, setUserConfig
} from "@/src/server-actions/admin/adminActions";
import {EmailType, Languages} from "@/src/api/openapi";
import {EmailConfigConverter} from "@/src/converters/admin/email-config-converter";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {BaseService} from "@/src/services/BaseService";
import {ISetUSerConfigRequest} from "@/src/api/adminApi";

export class AdminService extends BaseService {
    public static async getEmailConfig(): Promise<EmailConfig> {
        return await this.handleActionCall(async () => {
            const data = await getEmailConfig();
            return EmailConfigConverter.toInstance(data);
        });
    }

    public static async setEmailConfig(type: EmailType, language: Languages, templateId: number) {
        await this.handleActionCall(async () => {
            await setEmailConfig(type, language, templateId);
        });
    }

    public static async setUserConfig(cfg: ISetUSerConfigRequest) {
        await this.handleActionCall(async () => {
            await setUserConfig(cfg);
        });
    }

    public static async getAppBusinessConfig(): Promise<AppBusinessConfig> {
        return await this.handleActionCall(async () => {
            const config = await getAppBusinessConfig();
            return AppBusinessConfigConverter.toInstance(config);
        });
    }

    public static async updateAppBusinessConfig(config: AppBusinessConfig) {
        await this.handleActionCall(async () => {
            await changeAppBusinessConfig(config);
        });
    }
}