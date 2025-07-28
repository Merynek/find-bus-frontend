import {UserAdminDetailConverter} from "@/src/converters/user-admin-detail-converter";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {
    changeSettings,
    getAllUsers,
    getSettings,
    setUserVerification,
    updateTransportRequirementsPhotos
} from "@/src/app/actions/users/usersActions";
import {UserSettingsRequestDto} from "@/src/api/openapi";
import {UsersConverter} from "@/src/converters/users-converter";
import {UserSettings} from "@/src/data/users/userSettings";
import {IUpdateTransportRequirementsPhotosRequest} from "@/src/api/usersApi";

export class UsersService {
    public static async getAllUsers(offset: number, limit: number): Promise<UserAdminDetail[]> {
        const data = await getAllUsers(offset, limit);

        return data.map(UserAdminDetailConverter.toInstance);
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

    public static async updateTransportRequirementsPhotos(req: IUpdateTransportRequirementsPhotosRequest) {
        await updateTransportRequirementsPhotos(req);
    }
}