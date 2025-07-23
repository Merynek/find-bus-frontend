import AdminUsersPage from "@/src/components/pages/admin/users/admin-users.page";
import {UsersService} from "@/src/services/UsersService";

interface IAdminUsersProps {
    searchParams: {
        offset?: string;
        limit?: string;
    };
}

async function PageWrapper(props: IAdminUsersProps) {
    const users = await UsersService.getAllUsers(0, 50);
    return <AdminUsersPage users={users} />;
}

export default PageWrapper;