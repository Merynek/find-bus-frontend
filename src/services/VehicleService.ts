import {
    addVehicle,
    addVehiclePhotos,
    getVehicle,
    getVehicles,
    setVehicleVerification, updateVehicle, updateVehiclePhotos
} from "../app/actions/vehicle/vehicleActions";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {
    IAddVehiclePhotosRequest,
    IAddVehicleRequest,
    IUpdateVehiclePhotosRequest,
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

    public static async addVehiclePhotos(req: IAddVehiclePhotosRequest) {
        await addVehiclePhotos(req);
    }

    public static async updateVehicle(req: IUpdateVehicleRequest) {
        await updateVehicle(req);
    }

    public static async updateVehiclePhotos(req: IUpdateVehiclePhotosRequest) {
        await updateVehiclePhotos(req);
    }
}