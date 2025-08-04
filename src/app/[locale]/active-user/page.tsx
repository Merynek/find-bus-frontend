import ActiveUserPage from "@/src/components/pages/sign/active-user/active-user-page";
import {PageProps} from "@/types/page.types";

interface ISearchParams {
    code?: string;
}

async function PageWrapper(props: PageProps<undefined, ISearchParams>) {
    const searchParams = await props.searchParams;

    return <ActiveUserPage code={searchParams?.code} />;
}

export default PageWrapper;