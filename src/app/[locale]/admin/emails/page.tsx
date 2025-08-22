import EmailConfigPage from "@/src/components/pages/admin/email-config/email-config.page";
import {AdminService} from "@/src/services/AdminService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    try {
        const config = await AdminService.getEmailConfig();
        return <EmailConfigPage cfg={config}/>;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;