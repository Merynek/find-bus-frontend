import AppConfigPage from "@/src/components/pages/admin/app-config/app-config.page";
import {AdminService} from "@/src/services/AdminService";
import {PageProps} from "@/types/page.types";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    try {
        const appConfig = await AdminService.getAppBusinessConfig();
        return <AppConfigPage cfg={AppBusinessConfigConverter.toJson(appConfig)} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;