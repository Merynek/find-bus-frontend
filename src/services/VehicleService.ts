import {
    addVehicle,
    getVehicle,
    getVehicles, sendVehicleToVerificationRequest,
    setVehicleVerification, updateVehicle, updateVehicleFiles
} from "../server-actions/vehicle/vehicleActions";
import {
    IAddVehicleRequest,
    IUploadVehicleFilesRequest,
    IUpdateVehicleRequest, ISendVehicleToVerificationRequest
} from "@/src/api/vehicleApi";
import {BaseService} from "@/src/services/BaseService";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";

export class VehicleService extends BaseService {
    public static async setVehicleVerification(vehicleId: number, verified: boolean) {
        await this.handleActionCall(async () => {
            await setVehicleVerification(vehicleId, verified);
        });
    }

    public static async getVehicle(vehicleId: number) {
        return await this.handleActionCall(async () => {
            const data = await getVehicle(vehicleId);
            return VehicleConverter.toInstance(data);
        });
    }

    public static async getVehicles() {
        return await this.handleActionCall(async () => {
            const data = await getVehicles();
            return data.map(VehicleConverter.toInstance);
        });
    }

    public static async addVehicle(req: IAddVehicleRequest) {
        return await this.handleActionCall(async () => {
            return await addVehicle(req);
        });
    }

    public static async updateVehicle(req: IUpdateVehicleRequest) {
        await this.handleActionCall(async () => {
            await updateVehicle(req);
        });
    }

    public static async sendVehicleToVerificationRequest(req: ISendVehicleToVerificationRequest) {
        await this.handleActionCall(async () => {
            await sendVehicleToVerificationRequest(req);
        });
    }

    public static async uploadVehicleFiles(req: IUploadVehicleFilesRequest) {
        await this.handleActionCall(async () => {
            await updateVehicleFiles(req);
        });
    }
}