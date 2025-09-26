import {
    addVehicle,
    getVehicle,
    getVehicles,
    setVehicleVerification, updateVehicle, updateVehicleFiles
} from "../server-actions/vehicle/vehicleActions";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {
    IAddVehicleRequest,
    IUploadVehicleFilesRequest,
    IUpdateVehicleRequest
} from "@/src/api/vehicleApi";
import {BaseService} from "@/src/services/BaseService";

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

    public static async uploadVehicleFiles(req: IUploadVehicleFilesRequest) {
        await this.handleActionCall(async () => {
            await updateVehicleFiles(req);
        });
    }
}