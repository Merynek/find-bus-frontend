import ActiveUserPage from "@/src/components/pages/sign/active-user/active-user-page";
import {PageProps} from "@/types/page.types";
import {URL_PARAMS} from "@/src/enums/router.enum";

interface IParams {
    [URL_PARAMS.TOKEN]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    return <ActiveUserPage code={params[URL_PARAMS.TOKEN]} />;
}

export default PageWrapper;