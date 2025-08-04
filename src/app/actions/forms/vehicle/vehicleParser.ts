import {parseAndNormalizeFormData} from "@/src/app/actions/forms/schemas";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {Country, GeoPoint, PlaceRequestDto} from "@/src/api/openapi";

export const parseVehicleFormData = (formData: FormData) => {
    const normalizedData = parseAndNormalizeFormData(formData, [FormDataEnum.amenities]);
    const departureStationExists = [
        normalizedData[FormDataEnum.departureStation_placeId],
        normalizedData[FormDataEnum.departureStation_point_lat],
        normalizedData[FormDataEnum.departureStation_point_lng],
        normalizedData[FormDataEnum.departureStation_country],
        normalizedData[FormDataEnum.departureStation_name],
        normalizedData[FormDataEnum.departureStation_placeFormatted]
    ].some(value => value !== undefined);

    let departureStation: Partial<PlaceRequestDto> | undefined = undefined;

    if (departureStationExists) {
        departureStation = {
            placeId: normalizedData[FormDataEnum.departureStation_placeId] as string,
            country: normalizedData[FormDataEnum.departureStation_country] as Country,
            name: normalizedData[FormDataEnum.departureStation_name] as string,
            placeFormatted: normalizedData[FormDataEnum.departureStation_placeFormatted] as string,
            point: {
                lat: Number(normalizedData[FormDataEnum.departureStation_point_lat]),
                lng: Number(normalizedData[FormDataEnum.departureStation_point_lng]),
            } as GeoPoint,
        };
    }

    return {
        ...normalizedData,
        departureStation: departureStation,
    };
};