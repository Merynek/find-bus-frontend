'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {VehicleApiResult, VehicleFormAction} from "@/src/forms-action/vehicle/VehicleFormAction";
import {VehicleSchema} from "@/src/forms-action/vehicle/VehicleSchema";

const VehicleFormActionHandler = new VehicleFormAction();

export async function vehicleFormAction(
    state: TFormActionState<typeof VehicleSchema, VehicleApiResult>,
    formData: FormData
): Promise<TFormActionState<typeof VehicleSchema, VehicleApiResult>> {
    return await VehicleFormActionHandler.handle(formData);
}