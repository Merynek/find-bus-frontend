'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {redirect} from "@/src/i18n/navigation";
import {Locale} from "next-intl";
import {ROUTES} from "@/src/enums/router.enum";
import {
    AdminTransportRequirementsVerificationSchema
} from "@/src/forms-action/admin/transport-requirements-verification/AdminTransportRequirementsVerificationSchema";
import {
    AdminTransportRequirementsVerificationFormAction
} from "@/src/forms-action/admin/transport-requirements-verification/AdminTransportRequirementsVerificationFormAction";

const AdminTransportRequirementsVerificationFormActionHandler = new AdminTransportRequirementsVerificationFormAction();

export async function adminTransportRequirementsVerificationFormAction(
    state: TFormActionState<typeof AdminTransportRequirementsVerificationSchema>,
    formData: FormData
): Promise<TFormActionState<typeof AdminTransportRequirementsVerificationSchema>> {
    const result = await AdminTransportRequirementsVerificationFormActionHandler.handle(formData);

    if (result?.success && result?.data) {
        redirect({
            locale: result.data.locale as Locale,
            href: ROUTES.ADMIN_USERS
        });
    }

    return result;
}