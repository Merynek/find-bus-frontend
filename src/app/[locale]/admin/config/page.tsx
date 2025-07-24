import AppConfigPage from "@/src/components/pages/admin/app-config/app-config.page";
import {getAppBusinessConfig} from "@/src/app/actions/admin/adminActions";

async function PageWrapper() {
    const appConfig = await getAppBusinessConfig();
    return <AppConfigPage cfg={appConfig} />;
}

export default PageWrapper;