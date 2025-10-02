'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {VehicleFormAction} from "@/src/forms-action/vehicle/VehicleFormAction";
import {VehicleSchema} from "@/src/forms-action/vehicle/VehicleSchema";
import {redirect} from "@/src/i18n/navigation";
import {Locale} from "next-intl";
import {ROUTES} from "@/src/enums/router.enum";

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