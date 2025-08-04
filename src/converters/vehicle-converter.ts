import {VehicleResponseDto} from "../api/openapi";
import {Vehicle} from "../data/users/vehicle";
import {PlaceConverter} from "./place-converter";
import {toJS} from "mobx";
import {FileConverter} from "@/src/converters/file-converter";

export class VehicleConverter {
    public static toInstance(vehicleDto: VehicleResponseDto): Vehicle {
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
            frontPhoto: vehicleDto.frontPhoto ? FileConverter.toPhotoInstance(vehicleDto.frontPhoto): null,
            rearPhoto: vehicleDto.rearPhoto ? FileConverter.toPhotoInstance(vehicleDto.rearPhoto) : null,
            leftSidePhoto: vehicleDto.leftSidePhoto ? FileConverter.toPhotoInstance(vehicleDto.leftSidePhoto) : null,
            rightSidePhoto: vehicleDto.rightSidePhoto ? FileConverter.toPhotoInstance(vehicleDto.rightSidePhoto) : null,
            interierPhoto1: vehicleDto.interierPhoto1 ? FileConverter.toPhotoInstance(vehicleDto.interierPhoto1) : null,
            interierPhoto2: vehicleDto.interierPhoto2 ? FileConverter.toPhotoInstance(vehicleDto.interierPhoto2): null,
            technicalCertificate1: vehicleDto.technicalCertificate1 ? FileConverter.toPhotoInstance(vehicleDto.technicalCertificate1) : null,
            technicalCertificate2: vehicleDto.technicalCertificate2 ? FileConverter.toPhotoInstance(vehicleDto.technicalCertificate2) : null,
            insurance: vehicleDto.insurance ? FileConverter.toPhotoInstance(vehicleDto.insurance) : null,
            departureStation: vehicleDto.departureStation ? PlaceConverter.toInstance(vehicleDto.departureStation) : null
        })
    }

    public static toJson(vehicle: Vehicle): VehicleResponseDto {
        return {
            id: vehicle.id || 0,
            name: vehicle.name,
            registrationSign: vehicle.registrationSign,
            vin: vehicle.VIN,
            stkExpired: vehicle.stkExpired,
            yearOfManufacture: vehicle.yearOfManufacture,
            personsCapacity: vehicle.personsCapacity,
            euro: vehicle.euro,
            amenities: toJS(vehicle.amenities),
            handicappedUserCount: vehicle.handicappedUserCount,
            frontPhoto: vehicle.frontPhoto ? FileConverter.photoToJson(vehicle.frontPhoto) : undefined,
            rearPhoto: vehicle.rearPhoto ? FileConverter.photoToJson(vehicle.rearPhoto) : undefined,
            leftSidePhoto: vehicle.leftSidePhoto ? FileConverter.photoToJson(vehicle.leftSidePhoto) : undefined,
            rightSidePhoto: vehicle.rightSidePhoto ? FileConverter.photoToJson(vehicle.rightSidePhoto) : undefined,
            interierPhoto1: vehicle.interierPhoto1 ? FileConverter.photoToJson(vehicle.interierPhoto1) : undefined,
            interierPhoto2: vehicle.interierPhoto2 ? FileConverter.photoToJson(vehicle.interierPhoto2) : undefined,
            technicalCertificate1: vehicle.technicalCertificate1 ? FileConverter.photoToJson(vehicle.technicalCertificate1) : undefined,
            technicalCertificate2: vehicle.technicalCertificate2 ? FileConverter.photoToJson(vehicle.technicalCertificate2) : undefined,
            insurance: vehicle.insurancePhoto ? FileConverter.photoToJson(vehicle.insurancePhoto) : undefined,
            departureStation: vehicle.departureStation ? PlaceConverter.toJson(vehicle.departureStation) : undefined,
            isVerifiedForTransporting: vehicle.isVerifiedForTransporting
        }
    }
}