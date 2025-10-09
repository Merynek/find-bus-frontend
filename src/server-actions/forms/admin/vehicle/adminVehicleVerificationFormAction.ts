'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {redirect} from "@/src/i18n/navigation";
import {Locale} from "next-intl";
import {ROUTES} from "@/src/enums/router.enum";
import {
    AdminVehicleVerificationFormAction
} from "@/src/forms-action/admin/vehicle-verification/AdminVehicleVerificationFormAction";
import {
    AdminVehicleVerificationSchema
} from "@/src/forms-action/admin/vehicle-verification/AdminVehicleVerificationSchema";

const AdminVehicleVerificationFormActionHandler = new AdminVehicleVerificationFormAction();

export async function adminVehicleVerificationFormAction(
    state: TFormActionState<typeof AdminVehicleVerificationSchema>,
    formData: FormData
): Promise<TFormActionState<typeof AdminVehicleVerificationSchema>> {
    const result = await AdminVehicleVerificationFormActionHandler.handle(formData);

    if (result?.success && result?.data) {
        redirect({
            locale: result.data.locale as Locale,
            href: ROUTES.ADMIN_USERS
        });
    }

    return result;
}