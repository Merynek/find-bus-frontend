'use server';

import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import { z } from 'zod';
import {EditVehicleSchema} from "@/src/app/actions/forms/vehicle/edit/editVehicleSchema";
import {VehicleService} from "@/src/services/VehicleService";
import {Country, PlaceRequestDto} from "@/src/api/openapi";

type EditVehicleSchemaFieldErrors = z.inferFlattenedErrors<typeof EditVehicleSchema>['fieldErrors'];

export type TEditVehicleFormState = {
    errors?: EditVehicleSchemaFieldErrors;
    message?: string;
    error?: string;
} | undefined;

export async function editVehicleFormAction(state: TEditVehicleFormState, formData: FormData): Promise<TEditVehicleFormState> {
    const dataToValidate = {
        vehicleId: Number(formData.get('vehicleId')),
        frontPhoto: formData.get('frontPhoto'),
        rearPhoto: formData.get('rearPhoto'),
        leftSidePhoto: formData.get('leftSidePhoto'),
        rightSidePhoto: formData.get('rightSidePhoto'),
        interierPhoto1: formData.get('interierPhoto1'),
        interierPhoto2: formData.get('interierPhoto2'),
        technicalCertificate1: formData.get('technicalCertificate1'),
        technicalCertificate2: formData.get('technicalCertificate2'),
        insurance: formData.get('insurance'),
        name: formData.get('name'),
        vin: formData.get('vin'),
        registrationSign: formData.get('registrationSign'),
        personsCapacity: Number(formData.get('personsCapacity')),
        handicappedUserCount: Number(formData.get('handicappedUserCount')),
        yearOfManufacture: Number(formData.get('yearOfManufacture')),
        euro: formData.get('euro'),
        amenities: formData.getAll('amenities'),
        stkExpired: formData.get('stkExpired'),
        departureStation: ((): PlaceRequestDto|undefined => {
            const placeId = formData.get('departureStation.placeId');
            const lat = formData.get('departureStation.point.lat');
            const lng = formData.get('departureStation.point.lng');
            const country = formData.get('departureStation.country');
            const name = formData.get('departureStation.name');
            const placeFormatted = formData.get('departureStation.placeFormatted');

            if (placeId && lat && lng && country && name && placeFormatted) {
                return {
                    placeId: placeId as string,
                    point: { lat: Number(lat), lng: Number(lng) },
                    country: country as Country,
                    name: name as string,
                    placeFormatted: placeFormatted as string,
                };
            }
            return undefined;
        })(),
    };

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
