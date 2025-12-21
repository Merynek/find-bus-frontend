import ResetPasswordPage from "@/src/components/pages/sign/reset-password/reset-password-page";
import {PageProps} from "@/types/page.types";
import {URL_PARAMS} from "@/src/enums/router.enum";

interface IParams {
    [URL_PARAMS.TOKEN]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    return <ResetPasswordPage token={params[URL_PARAMS.TOKEN]}/>;
}

export default PageWrapper;