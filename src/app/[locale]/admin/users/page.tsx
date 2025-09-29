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

    try {
        const users = await UsersService.getAllUsers(0, 50);
        const appConfig = await AdminService.getAppBusinessConfig();

        return <AdminUsersPage
            users={users}
            config={appConfig}
        />
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;