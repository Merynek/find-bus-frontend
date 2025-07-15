import { setVehicleVerification } from "../app/actions/users/vehicleActions";

export class VehicleService {
    public static async setVehicleVerification(vehicleId: number, verified: boolean) {
        await setVehicleVerification(vehicleId, verified);
    }
}