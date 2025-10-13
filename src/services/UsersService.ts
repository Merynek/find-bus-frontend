import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {
    changeSettings,
    getAllUsers,
    getSettings,
    setUserVerification,
    updateTransportRequirementsPhotos
} from "@/src/server-actions/users/usersActions";
import {UserSettingsRequestDto} from "@/src/api/openapi";
import {UserSettings} from "@/src/data/users/userSettings";
import {IUpdateTransportRequirementsPhotosRequest} from "@/src/api/usersApi";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import {BaseService} from "@/src/services/BaseService";
import {UserSettingsConverter} from "@/src/converters/users/user-settings-converter";

export class UsersService extends BaseService {
    public static async getAllUsers(offset: number, limit: number): Promise<UserAdminDetail[]> {
        return await this.handleActionCall(async () => {
            const data = await getAllUsers(offset, limit);
            return data.map(UserAdminDetailConverter.toInstance);
        });
    }

    public static async setUserVerification(userId: number, verified: boolean) {
        await this.handleActionCall(async () => {
            await setUserVerification(userId, verified);
        });
    }

    public static async changeSettings(settings: UserSettingsRequestDto) {
        await this.handleActionCall(async () => {
            await changeSettings(settings);
        });
    }

    public static async getSettings(): Promise<UserSettings> {
        return await this.handleActionCall(async () => {
            const data = await getSettings();
            return UserSettingsConverter.toInstance(data);
        });
    }

    public static async updateTransportRequirementsPhotos(req: IUpdateTransportRequirementsPhotosRequest) {
        await this.handleActionCall(async () => {
            await updateTransportRequirementsPhotos(req);
        });
    }
}