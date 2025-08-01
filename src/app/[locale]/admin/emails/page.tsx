import EmailConfigPage from "@/src/components/pages/admin/email-config/email-config.page";
import {AdminService} from "@/src/services/AdminService";
import {PageProps} from "@/types/page.types";

async function PageWrapper(props: PageProps) {
    const config = await AdminService.getEmailConfig(props.params.locale);

    return <EmailConfigPage cfg={config}/>;
}

export default PageWrapper;