import ResetPasswordPage from "@/src/components/pages/sign/reset-password/reset-password-page";
import {PageProps} from "@/types/page.types";

interface ISearchParams {
    token?: string;
}

async function PageWrapper(props: PageProps<Record<string, never>, ISearchParams>) {
    const searchParams = await props.searchParams;
    const token = await searchParams?.token;
    return <ResetPasswordPage token={token || ""}/>;
}

export default PageWrapper;