'use server';

import {TFormActionState} from "@/src/forms/BaseFormAction";
import {VehicleFormAction} from "@/src/forms/vehicle/VehicleFormAction";
import {VehicleSchema} from "@/src/forms/vehicle/VehicleSchema";

const VehicleFormActionHandler = new VehicleFormAction();

export async function vehicleFormAction(
    state: TFormActionState<typeof VehicleSchema>,
    formData: FormData
): Promise<TFormActionState<typeof VehicleSchema>> {
    return await VehicleFormActionHandler.handle(formData);
}