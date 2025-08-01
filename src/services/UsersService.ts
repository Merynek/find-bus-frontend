import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {
    changeSettings,
    getAllUsers,
    getSettings,
    setUserVerification,
    updateTransportRequirementsPhotos
} from "@/src/app/actions/users/usersActions";
import {UserSettingsRequestDto} from "@/src/api/openapi";
import {UserSettings} from "@/src/data/users/userSettings";
import {IUpdateTransportRequirementsPhotosRequest} from "@/src/api/usersApi";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import {UsersConverter} from "@/src/converters/users/users-converter";
import {LOCALES} from "@/src/utils/locale";

export class UsersService {
    public static async getAllUsers(offset: number, limit: number, locale: LOCALES): Promise<UserAdminDetail[]> {
        const data = await getAllUsers(offset, limit, locale);

        return data.map(UserAdminDetailConverter.toInstance);
    }

    public static async setUserVerification(userId: number, verified: boolean) {
        await setUserVerification(userId, verified);
    }

    public static async changeSettings(settings: UserSettingsRequestDto) {
        await changeSettings(settings);
    }

    public static async getSettings(locale: LOCALES): Promise<UserSettings> {
        const data = await getSettings(locale);
        return UsersConverter.userSettingsToInstance(data);
    }

    public static async updateTransportRequirementsPhotos(req: IUpdateTransportRequirementsPhotosRequest) {
        await updateTransportRequirementsPhotos(req);
    }
}