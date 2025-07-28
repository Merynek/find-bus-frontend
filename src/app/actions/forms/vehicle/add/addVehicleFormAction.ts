'use server';

import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import { z } from 'zod';
import {AddVehicleSchema} from "@/src/app/actions/forms/vehicle/add/addVehicleSchema";
import {VehicleService} from "@/src/services/VehicleService";
import {Country, PlaceRequestDto} from "@/src/api/openapi";
import {FormDataEnum} from "@/src/enums/form-data.enum";

type AddVehicleSchemaFieldErrors = z.inferFlattenedErrors<typeof AddVehicleSchema>['fieldErrors'];

export type TAddVehicleFormState = {
    errors?: AddVehicleSchemaFieldErrors;
    message?: string;
    error?: string;
} | undefined;

export async function addVehicleFormAction(state: TAddVehicleFormState, formData: FormData): Promise<TAddVehicleFormState> {
    const dataToValidate = {
        frontPhoto: formData.get(FormDataEnum.frontPhoto),
        rearPhoto: formData.get(FormDataEnum.rearPhoto),
        leftSidePhoto: formData.get(FormDataEnum.leftSidePhoto),
        rightSidePhoto: formData.get(FormDataEnum.rightSidePhoto),
        interierPhoto1: formData.get(FormDataEnum.interierPhoto1),
        interierPhoto2: formData.get(FormDataEnum.interierPhoto2),
        technicalCertificate1: formData.get(FormDataEnum.technicalCertificate1),
        technicalCertificate2: formData.get(FormDataEnum.technicalCertificate2),
        insurance: formData.get(FormDataEnum.insurance),
        name: formData.get(FormDataEnum.name),
        vin: formData.get(FormDataEnum.vin),
        registrationSign: formData.get(FormDataEnum.registrationSign),
        personsCapacity: Number(formData.get(FormDataEnum.personsCapacity)),
        handicappedUserCount: Number(formData.get(FormDataEnum.handicappedUserCount)),
        yearOfManufacture: Number(formData.get(FormDataEnum.yearOfManufacture)),
        euro: formData.get(FormDataEnum.euro),
        amenities: formData.getAll(FormDataEnum.amenities),
        stkExpired: formData.get(FormDataEnum.stkExpired),
        departureStation: ((): PlaceRequestDto|undefined => {
            const placeId = formData.get(FormDataEnum.departureStation_placeId);
            const lat = formData.get(FormDataEnum.departureStation_point_lat);
            const lng = formData.get(FormDataEnum.departureStation_point_lng);
            const country = formData.get(FormDataEnum.departureStation_country);
            const name = formData.get(FormDataEnum.departureStation_name);
            const placeFormatted = formData.get(FormDataEnum.departureStation_placeFormatted);

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

    const validatedFields = AddVehicleSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        console.error(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const vehicleId = await VehicleService.addVehicle({
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
