import {getVehicle, getVehicles, setVehicleVerification} from "../app/actions/users/vehicleActions";
import {VehicleConverter} from "@/src/converters/vehicle-converter";

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
}