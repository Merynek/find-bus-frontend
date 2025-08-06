'use server';

import {ROUTES} from "@/src/enums/router.enum";
import { redirect } from "@/src/i18n/navigation";
import {TFormActionState} from "@/src/forms/BaseFormAction";
import {VehicleFormAction} from "@/src/forms/vehicle/VehicleFormAction";
import {Locale} from "next-intl";
import {VehicleSchema} from "@/src/forms/vehicle/VehicleSchema";

const VehicleFormActionHandler = new VehicleFormAction();

export async function vehicleFormAction(
    state: TFormActionState<typeof VehicleSchema>,
    formData: FormData
): Promise<TFormActionState<typeof VehicleSchema>> {
    const result = await VehicleFormActionHandler.handle(formData);

    if (result?.success && result?.data) {
        redirect({
            locale: result.data.locale as Locale,
            href: ROUTES.VEHICLES
        });
    }

    return result;
}