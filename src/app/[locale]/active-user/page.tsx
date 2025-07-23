import ActiveUserPage from "@/src/components/pages/sign/active-user/active-user-page";

interface ActiveUserPageProps {
    searchParams: {
        code?: string;
    };
}

function PageWrapper(props: ActiveUserPageProps)  {
    return <ActiveUserPage {...props} />;
}

export default PageWrapper;