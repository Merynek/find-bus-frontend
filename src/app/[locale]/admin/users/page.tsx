import AdminUsersPage from "@/src/components/pages/admin/users/admin-users.page";
import {UsersService} from "@/src/services/UsersService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {AdminService} from "@/src/services/AdminService";

interface ISearchParams {
    offset?: string;
    limit?: string;
}

async function PageWrapper(props: PageProps<Record<string, never>, ISearchParams>) {
    const params = await props.params;
    let users;
    let appConfig;

    try {
        users = await UsersService.getAllUsers(0, 50);
        appConfig = await AdminService.getAppBusinessConfig();
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <AdminUsersPage
        users={users}
        config={appConfig}
    />
}

export default PageWrapper;