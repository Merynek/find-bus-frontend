import {Amenities, EuroStandard, type VehicleStatus} from "../../api/openapi";
import {Image} from "../media/Image";
import {Place} from "../place";

export interface IVehicleSettings {
    id: number;
    status: VehicleStatus;
    name: string;
    registrationSign: string;
    VIN: string;
    stkExpired: Date;
    yearOfManufacture: number;
    personsCapacity: number;
    euroStandard: EuroStandard;
    amenities: Amenities[];
    handicappedUserCount: number;
    frontPhoto: Image|null;
    rearPhoto: Image|null;
    leftSidePhoto: Image|null;
    rightSidePhoto: Image|null;
    interierPhoto1: Image|null;
    interierPhoto2: Image|null;
    technicalCertificate1: Image|null;
    technicalCertificate2: Image|null;
    insurance: Image|null;
    departureStation: Place|null;
    isVerifiedForTransporting: boolean;
}

export class Vehicle {
    public id: number;
    public status: VehicleStatus;
    public name: string;
    public registrationSign: string;
    public VIN: string;
    public stkExpired: Date;
    public yearOfManufacture: number;
    public personsCapacity: number;
    public euro: EuroStandard;
    public amenities: Amenities[];
    public handicappedUserCount: number;
    public frontPhoto: Image|null;
    public rearPhoto: Image|null;
    public leftSidePhoto: Image|null;
    public rightSidePhoto: Image|null;
    public interierPhoto1: Image|null;
    public interierPhoto2: Image|null;
    public technicalCertificate1: Image|null;
    public technicalCertificate2: Image|null;
    public insurancePhoto: Image|null;
    public departureStation: Place|null;
    public isVerifiedForTransporting: boolean;

    constructor(settings: IVehicleSettings) {
        this.id = settings.id;
        this.status = settings.status;
        this.name = settings.name;
        this.registrationSign = settings.registrationSign;
        this.VIN = settings.VIN;
        this.stkExpired = settings.stkExpired;
        this.yearOfManufacture = settings.yearOfManufacture;
        this.personsCapacity = settings.personsCapacity;
        this.euro = settings.euroStandard;
        this.amenities = settings.amenities;
        this.handicappedUserCount = settings.handicappedUserCount;
        this.frontPhoto = settings.frontPhoto;
        this.rearPhoto = settings.rearPhoto;
        this.leftSidePhoto = settings.leftSidePhoto;
        this.rightSidePhoto = settings.rightSidePhoto;
        this.interierPhoto1 = settings.interierPhoto1;
        this.interierPhoto2 = settings.interierPhoto2;
        this.technicalCertificate1 = settings.technicalCertificate1;
        this.technicalCertificate2 = settings.technicalCertificate2;
        this.insurancePhoto = settings.insurance;
        this.departureStation = settings.departureStation;
        this.isVerifiedForTransporting = settings.isVerifiedForTransporting;
    }
}