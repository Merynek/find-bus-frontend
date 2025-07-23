import EmailConfigPage from "@/src/components/pages/admin/email-config/email-config.page";
import {getEmailConfig} from "@/src/app/actions/admin/adminActions";

async function PageWrapper() {
    const config = await getEmailConfig();

    return <EmailConfigPage cfg={config}/>;
}

export default PageWrapper;