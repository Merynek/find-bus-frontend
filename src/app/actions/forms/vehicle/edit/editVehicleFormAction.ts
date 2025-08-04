'use server';

import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import { z } from 'zod';
import {VehicleService} from "@/src/services/VehicleService";
import {EditVehicleSchema} from "@/src/app/actions/forms/vehicle/vehicleSchema";
import {parseVehicleFormData} from "@/src/app/actions/forms/vehicle/vehicleParser";

type EditVehicleSchemaFieldErrors = z.inferFlattenedErrors<typeof EditVehicleSchema>['fieldErrors'];

export type TEditVehicleFormState = {
    errors?: EditVehicleSchemaFieldErrors;
    message?: string;
    error?: string;
} | undefined;

export async function editVehicleFormAction(state: TEditVehicleFormState, formData: FormData): Promise<TEditVehicleFormState> {
    const dataToValidate = parseVehicleFormData(formData);
    const validatedFields = EditVehicleSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        console.error(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
         await VehicleService.updateVehicle({
             vehicleId: validatedFields.data.vehicleId,
             vehicle: {
                 name: validatedFields.data.name,
                 personsCapacity: validatedFields.data.personsCapacity,
                 euro: validatedFields.data.euro,
                 amenities: validatedFields.data.amenities,
                 handicappedUserCount: validatedFields.data.handicappedUserCount,
                 vin: validatedFields.data.vin,
                 registrationSign: validatedFields.data.registrationSign,
                 stkExpired: validatedFields.data.stkExpired,
                 yearOfManufacture: validatedFields.data.yearOfManufacture,
                 departureStation: validatedFields.data.departureStation
             }
        });
        await VehicleService.uploadVehicleFiles({
            vehicleId: validatedFields.data.vehicleId,
            frontPhoto: validatedFields.data.frontPhoto,
            rearPhoto: validatedFields.data.rearPhoto,
            leftSidePhoto: validatedFields.data.leftSidePhoto,
            rightSidePhoto: validatedFields.data.rightSidePhoto,
            interierPhoto1: validatedFields.data.interierPhoto1,
            interierPhoto2: validatedFields.data.interierPhoto2,
            technicalCertificate1: validatedFields.data.technicalCertificate1,
            technicalCertificate2: validatedFields.data.technicalCertificate2,
            insurance: validatedFields.data.insurance
        })
    } catch (error: any) {
        console.error('Chyba při updateu busu:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během updatu busu.',
        }
    }
    redirect(ROUTES.VEHICLES);
}
