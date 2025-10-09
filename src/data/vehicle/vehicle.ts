import {Amenities, EuroStandard, type VehicleStatus} from "../../api/openapi";
import {Place} from "../place";
import { VehicleDocument } from "./vehicleDocument";
import {VehiclePhoto} from "@/src/data/vehicle/vehiclePhoto";
import {VerificationFeedback} from "@/src/data/verificationFeedback";

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
    departureStation: Place|null;
    isVerifiedForTransporting: boolean;
    photos: VehiclePhoto[];
    documents: VehicleDocument[];
    verificationFeedback: VerificationFeedback|null;
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
    public departureStation: Place|null;
    public isVerifiedForTransporting: boolean;
    public photos: VehiclePhoto[];
    public documents: VehicleDocument[];
    public verificationFeedback: VerificationFeedback|null;

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
        this.photos = settings.photos;
        this.documents = settings.documents;
        this.departureStation = settings.departureStation;
        this.isVerifiedForTransporting = settings.isVerifiedForTransporting;
        this.verificationFeedback = settings.verificationFeedback;
    }
}