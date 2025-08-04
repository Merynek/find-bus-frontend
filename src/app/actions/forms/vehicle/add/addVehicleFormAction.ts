'use server';

import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import { z } from 'zod';
import {VehicleService} from "@/src/services/VehicleService";
import {VehicleSchema} from "@/src/app/actions/forms/vehicle/vehicleSchema";
import {parseVehicleFormData} from "@/src/app/actions/forms/vehicle/vehicleParser";

type AddVehicleSchemaFieldErrors = z.inferFlattenedErrors<typeof VehicleSchema>['fieldErrors'];

export type TAddVehicleFormState = {
    errors?: AddVehicleSchemaFieldErrors;
    message?: string;
    error?: string;
} | undefined;

export async function addVehicleFormAction(state: TAddVehicleFormState, formData: FormData): Promise<TAddVehicleFormState> {
    const dataToValidate = parseVehicleFormData(formData);
    const validatedFields = VehicleSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        console.error(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const vehicleId = await VehicleService.addVehicle({
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
            vehicleId: vehicleId,
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
        console.error('Chyba při pridani vozidla:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během přidání vozidla.',
        }
    }
    redirect(ROUTES.VEHICLES);
}
