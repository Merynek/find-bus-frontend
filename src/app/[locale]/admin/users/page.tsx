import AdminUsersPage from "@/src/components/pages/admin/users/admin-users.page";
import {UsersService} from "@/src/services/UsersService";
import {PageProps} from "@/types/page.types";

interface ISearchParams {
    offset?: string;
    limit?: string;
}

async function PageWrapper(props: PageProps<Record<string, never>, ISearchParams>) {
    const users = await UsersService.getAllUsers(0, 50, props.params.locale);
    return <AdminUsersPage users={users} />;
}

export default PageWrapper;