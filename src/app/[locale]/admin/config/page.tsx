import AppConfigPage from "@/src/components/pages/admin/app-config/app-config.page";
import {AdminService} from "@/src/services/AdminService";
import {PageProps} from "@/types/page.types";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    const appConfig = await AdminService.getAppBusinessConfig(params.locale);
    return <AppConfigPage cfg={appConfig} />;
}

export default PageWrapper;