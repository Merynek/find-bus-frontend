import {Vehicle} from "../src/data/users/vehicle";
import {getRandomBoolean, getRandomEnum, getRandomId} from "./tools";
import {getRandomNumber} from "../src/utils/common";
import {getRandomText} from "./texts/texts";
import {Amenities, EuroStandard} from "../src/api/openapi";
import {getRandomPhoto} from "./photos/photos";
import {getRandomDate} from "./time";
import {VehicleEditStore} from "../src/components/compositions/vehicle/edit/vehicle-edit.store";
import {getRandomPlace} from "./places/place";

export function getRandomVehicle(): Vehicle {
    const amenities: Amenities[] = [];
    for (let i = 0; i < getRandomNumber(1, 4); i++) {
        amenities.push(getRandomEnum(Amenities));
    }
    return new Vehicle({
        id: getRandomId(),
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
        frontPhoto: getRandomPhoto(),
        rearPhoto: getRandomPhoto(),
        leftSidePhoto: getRandomPhoto(),
        rightSidePhoto: getRandomPhoto(),
        interierPhoto1: getRandomPhoto(),
        interierPhoto2: getRandomPhoto(),
        insurance: getRandomPhoto(),
        technicalCertificate1: getRandomPhoto(),
        technicalCertificate2: getRandomBoolean() ? getRandomPhoto() : null,
        departureStation: getRandomBoolean() ? getRandomPlace() : null
    })
}

export function getRandomEditVehicleStore(): VehicleEditStore {
    return new VehicleEditStore({
        vehicle: getRandomVehicle()
    })
}