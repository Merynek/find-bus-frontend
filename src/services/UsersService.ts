import {AdminConverter} from "@/src/converters/admin-converter";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {getAllUsers} from "@/src/app/actions/users/usersActions";

export class UsersService {
    public static async getAllUsers(offset: number, limit: number): Promise<UserAdminDetail[]> {
        const data = await getAllUsers(offset, limit);

        return data.map(AdminConverter.userAdminDetailToClient);
    }
}