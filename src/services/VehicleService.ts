import {
    addVehicle, completePublicUploadVehiclePhotos,
    completeUploadVehicleFiles, createPublicUploadUrlForVehiclePhotos,
    createUploadUrlForVehicleFiles,
    getVehicle,
    getVehicles, sendVehicleToVerificationRequest,
    setVehicleVerification, updateVehicle
} from "../server-actions/vehicle/vehicleActions";
import {
    IAddVehicleRequest,
    IUpdateVehicleRequest,
    ISendVehicleToVerificationRequest,
    ISetVehicleVerificationRequest,
    ICreateUploadUrlForVehicleFilesRequest,
    ICompleteUploadVehicleFilesRequest,
    ICreatePublicUploadUrlForVehiclePhotosRequest, ICompletePublicUploadVehiclePhotosRequest, IGetVehiclesRequest
} from "@/src/api/vehicleApi";
import {BaseService} from "@/src/services/BaseService";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";
import {VehicleFilesSasUrlConverter} from "@/src/converters/vehicle/vehicle-files-sas-url-converter";
import {VehicleFilesSasUrl} from "@/src/data/vehicle/vehicleFilesSasUrl";
import type {VehiclePublicUploadSasUrlResponseDto} from "@/src/api/openapi";
import {VehiclePublicPhotosSasUrlConverter} from "@/src/converters/vehicle/vehicle-public-photos-sas-url-converter";

export class VehicleService extends BaseService {
    public static async setVehicleVerification(req: ISetVehicleVerificationRequest) {
        await this.handleActionCall(async () => {
            await setVehicleVerification(req);
        });
    }

    public static async getVehicle(vehicleId: number) {
        return await this.handleActionCall(async () => {
            const data = await getVehicle(vehicleId);
            return VehicleConverter.toInstance(data);
        });
    }

    public static async getVehicles(req: IGetVehiclesRequest) {
        return await this.handleActionCall(async () => {
            const data = await getVehicles(req);
            return data.map(VehicleConverter.toInstance);
        });
    }

    public static async addVehicle(req: IAddVehicleRequest) {
        return await this.handleActionCall(async () => {
            return await addVehicle(req);
        });
    }

    public static async updateVehicle(req: IUpdateVehicleRequest): Promise<number> {
        return await this.handleActionCall(async () => {
            return await updateVehicle(req);
        });
    }

    public static async sendVehicleToVerificationRequest(req: ISendVehicleToVerificationRequest) {
        await this.handleActionCall(async () => {
            await sendVehicleToVerificationRequest(req);
        });
    }

    public static async createUploadUrlForVehicleFiles(req: ICreateUploadUrlForVehicleFilesRequest): Promise<VehicleFilesSasUrl> {
        return await this.handleActionCall(async () => {
            const response = await createUploadUrlForVehicleFiles(req);
            return VehicleFilesSasUrlConverter.toInstance(response);
        });
    }

    public static async completeUploadVehicleFiles(req: ICompleteUploadVehicleFilesRequest): Promise<number> {
        return await this.handleActionCall(async () => {
            return await completeUploadVehicleFiles(req);
        });
    }

    public static async createPublicUploadUrlForVehiclePhotos(req: ICreatePublicUploadUrlForVehiclePhotosRequest): Promise<VehiclePublicUploadSasUrlResponseDto> {
        return await this.handleActionCall(async () => {
            const response = await createPublicUploadUrlForVehiclePhotos(req);
            return VehiclePublicPhotosSasUrlConverter.toInstance(response);
        });
    }

    public static async completePublicUploadVehiclePhotos(req: ICompletePublicUploadVehiclePhotosRequest) {
        await this.handleActionCall(async () => {
            await completePublicUploadVehiclePhotos(req);
        });
    }
}