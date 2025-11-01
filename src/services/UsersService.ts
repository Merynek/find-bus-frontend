import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {
    changeSettings,
    completeUploadTransportRequirementsDocuments,
    createUploadUrlForTransportRequirementDocuments,
    getAllUsers,
    getSettings,
    getTransportRequirements,
    getUserTransportRequirements,
    sendTransportRequirementsToVerification,
    transportRequirementsVerification,
    updateTransportRequirements
} from "@/src/server-actions/users/usersActions";
import { UserSettingsRequestDto} from "@/src/api/openapi";
import {UserSettings} from "@/src/data/users/userSettings";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import {BaseService} from "@/src/services/BaseService";
import {UserSettingsConverter} from "@/src/converters/users/user-settings-converter";
import {
    ICompleteUploadTransportRequirementsDocumentsRequest,
    ICreateUploadUrlForTransportRequirementsFilesRequest,
    ISendTransportRequirementsToVerificationRequest,
    ISetTransportRequirementsVerificationRequest,
    IUpdateTransportRequirementsRequest
} from "@/src/api/usersApi";
import {TransportDocumentsSasUrl} from "@/src/data/users/transportDocumentsSasUrl";
import {TransportDocumentsSasUrlConverter} from "@/src/converters/users/transport-documents-sas-url-converter";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";

export class UsersService extends BaseService {
    public static async getAllUsers(offset: number, limit: number): Promise<UserAdminDetail[]> {
        return await this.handleActionCall(async () => {
            const data = await getAllUsers(offset, limit);
            return data.map(UserAdminDetailConverter.toInstance);
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

    public static async getUserTransportRequirements(userId: number): Promise<TransportRequirements> {
        return await this.handleActionCall(async () => {
            const data = await getUserTransportRequirements(userId);
            return TransportRequirementsConverter.toInstance(data);
        });
    }

    public static async getTransportRequirements(): Promise<TransportRequirements> {
        return await this.handleActionCall(async () => {
            const data = await getTransportRequirements();
            return TransportRequirementsConverter.toInstance(data);
        });
    }

    public static async createUploadUrlForTransportRequirementDocuments(req: ICreateUploadUrlForTransportRequirementsFilesRequest): Promise<TransportDocumentsSasUrl> {
        return await this.handleActionCall(async () => {
            const response = await createUploadUrlForTransportRequirementDocuments(req);
            return TransportDocumentsSasUrlConverter.toInstance(response);
        });
    }

    public static async completeUploadTransportRequirementsDocuments(req: ICompleteUploadTransportRequirementsDocumentsRequest): Promise<number> {
        return await this.handleActionCall(async () => {
            return await completeUploadTransportRequirementsDocuments(req);
        });
    }

    public static async transportRequirementsVerification(req: ISetTransportRequirementsVerificationRequest): Promise<void> {
        return await this.handleActionCall(async () => {
            return await transportRequirementsVerification(req);
        });
    }

    public static async updateTransportRequirements(req: IUpdateTransportRequirementsRequest): Promise<number> {
        return await this.handleActionCall(async () => {
            return await updateTransportRequirements(req);
        });
    }

    public static async sendTransportRequirementsToVerification(req: ISendTransportRequirementsToVerificationRequest): Promise<void> {
        return await this.handleActionCall(async () => {
            return await sendTransportRequirementsToVerification(req);
        });
    }
}