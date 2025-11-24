import EmailConfigPage from "@/src/components/pages/admin/email-config/email-config.page";
import {AdminService} from "@/src/services/AdminService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    let config;
    try {
        config = await AdminService.getEmailConfig();
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <EmailConfigPage cfg={config}/>;
}

export default PageWrapper;