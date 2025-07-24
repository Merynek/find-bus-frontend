import ResetPasswordPage from "@/src/components/pages/sign/reset-password/reset-password-page";

interface ResetPasswordPageProps {
    searchParams: {
        token?: string;
    };
}

async function PageWrapper(props: ResetPasswordPageProps) {
    const {searchParams} = props;
    const {token} = await searchParams;
    return <ResetPasswordPage token={token || ""}/>;
}

export default PageWrapper;