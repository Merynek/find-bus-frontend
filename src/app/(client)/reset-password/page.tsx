import ResetPasswordPage from "@/src/components/pages/sign/reset-password/reset-password-page";

interface ResetPasswordPageProps {
    searchParams: {
        token?: string;
    };
}

function PageWrapper(props: ResetPasswordPageProps)  {
    return <ResetPasswordPage {...props} />;
}

export default PageWrapper;