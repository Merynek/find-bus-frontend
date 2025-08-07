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
import {LOCALES} from "@/src/utils/locale";

export class VehicleService {
    public static async setVehicleVerification(vehicleId: number, verified: boolean) {
        await setVehicleVerification(vehicleId, verified);
    }

    public static async getVehicle(vehicleId: number) {
        const data = await getVehicle(vehicleId);
        return VehicleConverter.toInstance(data);
    }

    public static async getVehicles(locale: LOCALES) {
        const data = await getVehicles(locale);
        return data.map(VehicleConverter.toInstance);
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