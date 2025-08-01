import EmailConfigPage from "@/src/components/pages/admin/email-config/email-config.page";
import {AdminService} from "@/src/services/AdminService";
import {PageProps} from "@/types/page.types";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    const config = await AdminService.getEmailConfig(params.locale);

    return <EmailConfigPage cfg={config}/>;
}

export default PageWrapper;