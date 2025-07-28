import {Amenities, EuroStandard} from "../../api/openapi";
import {makeObservable, observable} from "mobx";
import {Photo} from "../media/photo";
import {Place} from "../place";

export interface IVehicleSettings {
    id?: number;
    name: string;
    registrationSign: string;
    VIN: string;
    stkExpired: Date;
    yearOfManufacture: number;
    personsCapacity: number;
    euroStandard: EuroStandard;
    amenities: Amenities[];
    handicappedUserCount: number;
    frontPhoto: Photo|null;
    rearPhoto: Photo|null;
    leftSidePhoto: Photo|null;
    rightSidePhoto: Photo|null;
    interierPhoto1: Photo|null;
    interierPhoto2: Photo|null;
    technicalCertificate1: Photo|null;
    technicalCertificate2: Photo|null;
    insurance: Photo|null;
    departureStation: Place|null;
    isVerifiedForTransporting: boolean;
}

export class Vehicle {
    public id?: number;
    @observable public name: string;
    @observable public registrationSign: string;
    @observable public VIN: string;
    @observable public stkExpired: Date;
    @observable public yearOfManufacture: number;
    @observable public personsCapacity: number;
    @observable public euro: EuroStandard;
    @observable public amenities: Amenities[];
    @observable public handicappedUserCount: number;
    @observable public frontPhoto: Photo|null;
    @observable public rearPhoto: Photo|null;
    @observable public leftSidePhoto: Photo|null;
    @observable public rightSidePhoto: Photo|null;
    @observable public interierPhoto1: Photo|null;
    @observable public interierPhoto2: Photo|null;
    @observable public technicalCertificate1: Photo|null;
    @observable public technicalCertificate2: Photo|null;
    @observable public insurancePhoto: Photo|null;
    @observable public departureStation: Place|null;
    public isVerifiedForTransporting: boolean;

    constructor(settings: IVehicleSettings) {
        this.id = settings.id;
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
        makeObservable(this);
    }

    public static create() {
        return new Vehicle({
            name: "",
            euroStandard: EuroStandard.EURO3,
            amenities: [],
            handicappedUserCount: 0,
            stkExpired: new Date(),
            VIN: "",
            yearOfManufacture: 0,
            registrationSign: "",
            personsCapacity: 0,
            frontPhoto: null,
            rearPhoto: null,
            leftSidePhoto: null,
            rightSidePhoto: null,
            interierPhoto1: null,
            interierPhoto2: null,
            technicalCertificate1: null,
            technicalCertificate2: null,
            insurance: null,
            departureStation: null,
            isVerifiedForTransporting: false
        });
    }
}