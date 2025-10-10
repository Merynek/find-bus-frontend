'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {VehicleFormAction} from "@/src/forms-action/vehicle/VehicleFormAction";
import {VehicleSchema} from "@/src/forms-action/vehicle/VehicleSchema";

const VehicleFormActionHandler = new VehicleFormAction();

export async function vehicleFormAction(
    state: TFormActionState<typeof VehicleSchema>,
    formData: FormData
): Promise<TFormActionState<typeof VehicleSchema>> {
    return await VehicleFormActionHandler.handle(formData);
}