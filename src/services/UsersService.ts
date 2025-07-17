import {AdminConverter} from "@/src/converters/admin-converter";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {changeSettings, getAllUsers, getSettings, setUserVerification} from "@/src/app/actions/users/usersActions";
import {UserSettingsRequestDto} from "@/src/api/openapi";
import {UsersConverter} from "@/src/converters/users-converter";
import {UserSettings} from "@/src/data/users/userSettings";

export class UsersService {
    public static async getAllUsers(offset: number, limit: number): Promise<UserAdminDetail[]> {
        const data = await getAllUsers(offset, limit);

        return data.map(AdminConverter.userAdminDetailToClient);
    }

    public static async setUserVerification(userId: number, verified: boolean) {
        await setUserVerification(userId, verified);
    }

    public static async changeSettings(settings: UserSettingsRequestDto) {
        await changeSettings(settings);
    }

    public static async getSettings(): Promise<UserSettings> {
        const data = await getSettings();
        return UsersConverter.userSettingsToClient(data);
    }
}