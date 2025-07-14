import {EmailConfig} from "@/src/data/emailConfig";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {AdminConverter} from "@/src/converters/admin-converter";
import {
    changeAppBusinessConfig,
    getAppBusinessConfig,
    getEmailConfig,
    setEmailConfig
} from "@/src/app/actions/admin/adminActions";
import {EmailType, Language} from "@/src/api/openapi";

export class AdminService {
    public static async getEmailConfig(): Promise<EmailConfig> {
        const data = await getEmailConfig();
        return AdminConverter.emailConfigToClient(data);
    }

    public static async setEmailConfig(type: EmailType, language: Language, templateId: number) {
        await setEmailConfig(type, language, templateId);
    }

    public static async getAppBusinessConfig(): Promise<AppBusinessConfig> {
        const config = await getAppBusinessConfig();
        return AdminConverter.appBusinessConfigToClient(config);
    }

    public static async updateAppBusinessConfig(config: AppBusinessConfig) {
        await changeAppBusinessConfig(config);
    }
}