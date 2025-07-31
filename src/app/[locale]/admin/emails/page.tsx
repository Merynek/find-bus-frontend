import EmailConfigPage from "@/src/components/pages/admin/email-config/email-config.page";
import {getEmailConfig} from "@/src/app/actions/admin/adminActions";
import {LOCALES} from "@/src/utils/locale";

interface PageProps {
    params: {
        locale: string;
    };
}

async function PageWrapper(props: PageProps) {
    const config = await getEmailConfig(props.params.locale as LOCALES);

    return <EmailConfigPage cfg={config}/>;
}

export default PageWrapper;