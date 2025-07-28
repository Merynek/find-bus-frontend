import {VehicleResponseDto} from "../api/openapi";
import {Vehicle} from "../data/users/vehicle";
import {Photo} from "../data/media/photo";
import {PlaceConverter} from "./place-converter";

export class VehicleConverter {
    private static vehiclePath = "Vehicles/";
    private static insurancePath = "VehiclesInsurance/";
    private static certificatePath = "VehiclesCertificate/";

    public static toClient(vehicleDto: VehicleResponseDto): Vehicle {
        return new Vehicle({
            id: vehicleDto.id,
            isVerifiedForTransporting: vehicleDto.isVerifiedForTransporting,
            amenities: vehicleDto.amenities,
            euroStandard: vehicleDto.euro,
            name: vehicleDto.name,
            personsCapacity: vehicleDto.personsCapacity,
            registrationSign: vehicleDto.registrationSign,
            VIN: vehicleDto.vin,
            stkExpired: vehicleDto.stkExpired,
            yearOfManufacture: vehicleDto.yearOfManufacture,
            handicappedUserCount: vehicleDto.handicappedUserCount,
            frontPhoto: vehicleDto.frontPhoto ? new Photo({
                id: vehicleDto.frontPhoto.id,
                path: VehicleConverter.vehiclePath + vehicleDto.frontPhoto.path
            }) : null,
            rearPhoto: vehicleDto.rearPhoto ? new Photo({
                id: vehicleDto.rearPhoto.id,
                path: VehicleConverter.vehiclePath + vehicleDto.rearPhoto.path
            }) : null,
            leftSidePhoto: vehicleDto.leftSidePhoto ? new Photo({
                id: vehicleDto.leftSidePhoto.id,
                path: VehicleConverter.vehiclePath + vehicleDto.leftSidePhoto.path
            }) : null,
            rightSidePhoto: vehicleDto.rightSidePhoto ? new Photo({
                id: vehicleDto.rightSidePhoto.id,
                path: VehicleConverter.vehiclePath + vehicleDto.rightSidePhoto.path
            }) : null,
            interierPhoto1: vehicleDto.interierPhoto1 ? new Photo({
                id: vehicleDto.interierPhoto1.id,
                path: VehicleConverter.vehiclePath + vehicleDto.interierPhoto1.path
            }) : null,
            interierPhoto2: vehicleDto.interierPhoto2 ? new Photo({
                id: vehicleDto.interierPhoto2.id,
                path: VehicleConverter.vehiclePath + vehicleDto.interierPhoto2.path
            }) : null,
            technicalCertificate1: vehicleDto.technicalCertificate1 ? new Photo({
                id: vehicleDto.technicalCertificate1.id,
                path: VehicleConverter.certificatePath + vehicleDto.technicalCertificate1.path
            }) : null,
            technicalCertificate2: vehicleDto.technicalCertificate2 ? new Photo({
                id: vehicleDto.technicalCertificate2.id,
                path: VehicleConverter.certificatePath + vehicleDto.technicalCertificate2.path
            }) : null,
            insurance: vehicleDto.insurance ? new Photo({
                id: vehicleDto.insurance.id,
                path: VehicleConverter.insurancePath + vehicleDto.insurance.path
            }) : null,
            departureStation: vehicleDto.departureStation ? PlaceConverter.toInstance(vehicleDto.departureStation) : null
        })
    }
}