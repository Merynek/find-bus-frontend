'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {
    TransportRequirementApiResult,
    TransportRequirementsFormAction
} from "@/src/forms-action/transport-requirements/TransportRequirementsFormAction";
import {TransportRequirementsSchema} from "@/src/forms-action/transport-requirements/TransportRequirementsSchema";

const transportRequirementsFormActionHandler = new TransportRequirementsFormAction();

export async function transportRequirementsFormAction(
    state: TFormActionState<typeof TransportRequirementsSchema, TransportRequirementApiResult>,
    formData: FormData
): Promise<TFormActionState<typeof TransportRequirementsSchema, TransportRequirementApiResult>> {
    return transportRequirementsFormActionHandler.handle(formData);
}