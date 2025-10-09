import {toJS} from "mobx";
import { VehicleResponseDto } from "@/src/api/openapi";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {VehiclePhotoConverter} from "@/src/converters/vehicle/vehicle-photo-converter";
import {VehicleDocumentConverter} from "@/src/converters/vehicle/vehicle-document-converter";
import {PlaceConverter} from "@/src/converters/place-converter";
import {VerificationFeedbackConverter} from "@/src/converters/verification-feedback-converter";

export class VehicleConverter {
    public static toInstance(vehicleDto: VehicleResponseDto): Vehicle {
        return new Vehicle({
            id: vehicleDto.id,
            status: vehicleDto.status,
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
            photos: vehicleDto.vehiclePhotos.map(VehiclePhotoConverter.toInstance),
            documents: vehicleDto.vehicleDocuments.map(VehicleDocumentConverter.toInstance),
            departureStation: vehicleDto.departureStation ? PlaceConverter.toInstance(vehicleDto.departureStation) : null,
            verificationFeedback: vehicleDto.verificationFeedback ? VerificationFeedbackConverter.toInstance(vehicleDto.verificationFeedback) : null
        })
    }

    public static toJson(vehicle: Vehicle): VehicleResponseDto {
        return {
            id: vehicle.id,
            status: vehicle.status,
            name: vehicle.name,
            registrationSign: vehicle.registrationSign,
            vin: vehicle.VIN,
            stkExpired: vehicle.stkExpired,
            yearOfManufacture: vehicle.yearOfManufacture,
            personsCapacity: vehicle.personsCapacity,
            euro: vehicle.euro,
            amenities: toJS(vehicle.amenities),
            handicappedUserCount: vehicle.handicappedUserCount,
            departureStation: vehicle.departureStation ? PlaceConverter.toJson(vehicle.departureStation) : undefined,
            vehiclePhotos: vehicle.photos.map(VehiclePhotoConverter.toJson),
            vehicleDocuments: vehicle.documents.map(VehicleDocumentConverter.toJson),
            isVerifiedForTransporting: vehicle.isVerifiedForTransporting,
            verificationFeedback: vehicle.verificationFeedback ? VerificationFeedbackConverter.toJson(vehicle.verificationFeedback) : undefined
        }
    }
}