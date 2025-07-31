import AppConfigPage from "@/src/components/pages/admin/app-config/app-config.page";
import {AdminService} from "@/src/services/AdminService";

async function PageWrapper() {
    const appConfig = await AdminService.getAppBusinessConfig();
    return <AppConfigPage cfg={appConfig} />;
}

export default PageWrapper;