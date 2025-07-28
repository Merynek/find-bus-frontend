import {EmailConfig} from "@/src/data/emailConfig";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {
    changeAppBusinessConfig,
    getAppBusinessConfig,
    getEmailConfig,
    setEmailConfig
} from "@/src/app/actions/admin/adminActions";
import {EmailType, Language} from "@/src/api/openapi";
import {EmailConfigConverter} from "@/src/converters/admin/email-config-converter";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";

export class AdminService {
    public static async getEmailConfig(): Promise<EmailConfig> {
        const data = await getEmailConfig();
        return EmailConfigConverter.toInstance(data);
    }

    public static async setEmailConfig(type: EmailType, language: Language, templateId: number) {
        await setEmailConfig(type, language, templateId);
    }

    public static async getAppBusinessConfig(): Promise<AppBusinessConfig> {
        const config = await getAppBusinessConfig();
        return AppBusinessConfigConverter.toInstance(config);
    }

    public static async updateAppBusinessConfig(config: AppBusinessConfig) {
        await changeAppBusinessConfig(config);
    }
}