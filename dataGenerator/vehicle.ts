import {getRandomBoolean, getRandomEnum, getRandomId} from "./tools";
import {getRandomNumber} from "@/src/utils/common";
import {getRandomText} from "./texts/texts";
import {Amenities, EuroStandard, VehicleDocumentType, VehiclePhotoType, VehicleStatus} from "@/src/api/openapi";
import {getRandomPhoto} from "./photos/photos";
import {getRandomDate} from "./time";
import {getRandomPlace} from "./places/place";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {VehiclePhoto} from "@/src/data/vehicle/vehiclePhoto";
import { VehicleDocument } from "@/src/data/vehicle/vehicleDocument";

export function getRandomVehicle(): Vehicle {
    const amenities: Amenities[] = [];
    for (let i = 0; i < getRandomNumber(1, 4); i++) {
        amenities.push(getRandomEnum(Amenities));
    }
    return new Vehicle({
        id: getRandomId(),
        status: getRandomEnum(VehicleStatus),
        isVerifiedForTransporting: getRandomBoolean(),
        personsCapacity: getRandomNumber(20, 60),
        name: getRandomText(1),
        stkExpired: getRandomDate(),
        registrationSign: getRandomText(1),
        VIN: getRandomText(1),
        yearOfManufacture: getRandomNumber(1980, 2021),
        euroStandard: getRandomEnum(EuroStandard),
        amenities: amenities,
        handicappedUserCount: getRandomNumber(0, 5),
        photos: [getRandomVehiclePhoto(), getRandomVehiclePhoto(), getRandomVehiclePhoto()],
        documents: [getRandomVehicleDocument(), getRandomVehicleDocument(), getRandomVehicleDocument()],
        departureStation: getRandomBoolean() ? getRandomPlace() : null
    })
}

export function getRandomVehiclePhoto(): VehiclePhoto {
    return new VehiclePhoto({
        id: getRandomId(),
        file: getRandomPhoto(),
        type: getRandomEnum(VehiclePhotoType),
        isPublic: getRandomBoolean()
    })
}

export function getRandomVehicleDocument(): VehicleDocument {
    return new VehicleDocument({
        id: getRandomId(),
        file: getRandomPhoto(),
        type: getRandomEnum(VehicleDocumentType)
    })
}