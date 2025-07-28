import {
    addVehicle,
    getVehicle,
    getVehicles,
    setVehicleVerification, updateVehicle, updateVehicleFiles
} from "../app/actions/vehicle/vehicleActions";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {
    IAddVehicleRequest,
    IUploadVehicleFilesRequest,
    IUpdateVehicleRequest
} from "@/src/api/vehicleApi";

export class VehicleService {
    public static async setVehicleVerification(vehicleId: number, verified: boolean) {
        await setVehicleVerification(vehicleId, verified);
    }

    public static async getVehicle(vehicleId: number) {
        const data = await getVehicle(vehicleId);
        return VehicleConverter.toClient(data);
    }

    public static async getVehicles() {
        const data = await getVehicles();
        return data.map(VehicleConverter.toClient);
    }

    public static async addVehicle(req: IAddVehicleRequest) {
        return await addVehicle(req);
    }

    public static async updateVehicle(req: IUpdateVehicleRequest) {
        await updateVehicle(req);
    }

    public static async uploadVehicleFiles(req: IUploadVehicleFilesRequest) {
        await updateVehicleFiles(req);
    }
}