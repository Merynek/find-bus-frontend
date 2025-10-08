'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {redirect} from "@/src/i18n/navigation";
import {Locale} from "next-intl";
import {ROUTES} from "@/src/enums/router.enum";
import {AdminVehicleFormAction} from "@/src/forms-action/admin/vehicle/AdminVehicleFormAction";
import {AdminVehicleSchema} from "@/src/forms-action/admin/vehicle/AdminVehicleSchema";

const AdminVehicleFormActionHandler = new AdminVehicleFormAction();

export async function adminVehicleFormAction(
    state: TFormActionState<typeof AdminVehicleSchema>,
    formData: FormData
): Promise<TFormActionState<typeof AdminVehicleSchema>> {
    const result = await AdminVehicleFormActionHandler.handle(formData);

    if (result?.success && result?.data) {
        redirect({
            locale: result.data.locale as Locale,
            href: ROUTES.ADMIN_USERS
        });
    }

    return result;
}