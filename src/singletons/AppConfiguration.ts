export class AppConfiguration {
    private static _instance: AppConfiguration | null = null;

    public static get instance(): AppConfiguration {
        if (!AppConfiguration._instance) {
            AppConfiguration._instance = new AppConfiguration();
        }
        return AppConfiguration._instance;
    }

    public getApiUrl(): string {
        if (process.env.NEXT_PUBLIC_API_URL) {
            return process.env.NEXT_PUBLIC_API_URL;
        }
        throw new Error('Environment variable API_URL is not defined.');
    }
}