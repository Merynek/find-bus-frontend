import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {Photo} from "@/src/data/media/photo";
import {Vehicle} from "@/src/data/users/vehicle";
import {Place} from "@/src/data/place";

interface IVehicleStore {
    vehicle: Vehicle;
}

export class VehicleEditStore {
    @observable public id?: number;
    @observable private _name: string;
    @observable private _registrationSign: string;
    @observable private _VIN: string;
    @observable private _stkExpired: Date|null;
    @observable private _yearOfManufacture: number;
    @observable private _personsCapacity: number;
    @observable private _euro: EuroStandard;
    private _amenities: Amenities[];
    @observable private _handicappedUserCount: number;
    @observable private _frontPhoto: Photo|null;
    @observable private _rearPhoto: Photo|null;
    @observable private _leftSidePhoto: Photo|null;
    @observable private _rightSidePhoto: Photo|null;
    @observable private _interierPhoto1: Photo|null;
    @observable private _interierPhoto2: Photo|null;
    @observable private _technicalCertificate1: Photo|null;
    @observable private _technicalCertificate2: Photo|null;
    @observable private _insurancePhoto: Photo|null;
    @observable private _departureStation: Place|null;

    @observable public nameIsValid: boolean = true;
    @observable public registrationSignIsValid: boolean = true;
    @observable public vinIsValid: boolean = true;
    @observable public stkExpiredIsValid: boolean = true;
    @observable public yearOfManufactureIsValid: boolean = true;
    @observable public personsCapacityIsValid: boolean = true;
    @observable public frontPhotoIsValid: boolean = true;
    @observable public rearPhotoIsValid: boolean = true;
    @observable public leftSidePhotoIsValid: boolean = true;
    @observable public rightSidePhotoIsValid: boolean = true;
    @observable public interierPhoto1IsValid: boolean = true;
    @observable public interierPhoto2IsValid: boolean = true;
    @observable public technicalCertificatePhoto1IsValid: boolean = true;
    @observable public technicalCertificatePhoto2IsValid: boolean = true;
    @observable public insurancePhotoIsValid: boolean = true;
    @observable public departureStationIsValid: boolean = true;
    public isVerifiedForTransporting: boolean = false;

    constructor(settings: IVehicleStore) {
        this.id = settings.vehicle.id;
        this._name = settings.vehicle.name;
        this.isVerifiedForTransporting = settings.vehicle.isVerifiedForTransporting;
        this._registrationSign = settings.vehicle.registrationSign;
        this._VIN = settings.vehicle.VIN;
        this._stkExpired = settings.vehicle.stkExpired;
        this._yearOfManufacture = settings.vehicle.yearOfManufacture;
        this._personsCapacity = settings.vehicle.personsCapacity;
        this._euro = settings.vehicle.euro;
        this._amenities = settings.vehicle.amenities;
        this._handicappedUserCount = settings.vehicle.handicappedUserCount;
        this._frontPhoto = settings.vehicle.frontPhoto;
        this._rearPhoto = settings.vehicle.rearPhoto;
        this._leftSidePhoto = settings.vehicle.leftSidePhoto;
        this._rightSidePhoto = settings.vehicle.rightSidePhoto;
        this._interierPhoto1 = settings.vehicle.interierPhoto1;
        this._interierPhoto2 = settings.vehicle.interierPhoto2;
        this._technicalCertificate1 = settings.vehicle.technicalCertificate1;
        this._technicalCertificate2 = settings.vehicle.technicalCertificate2;
        this._insurancePhoto = settings.vehicle.insurancePhoto;
        this._departureStation = settings.vehicle.departureStation;
        makeObservable(this);
    }

    get yearOfManufacture(): number {
        return this._yearOfManufacture;
    }

    set yearOfManufacture(value: number) {
        runInAction(() => {
            this._yearOfManufacture = value;
        })
    }

    get stkExpired(): Date|null {
        return this._stkExpired;
    }

    set stkExpired(value: Date|null) {
        runInAction(() => {
            this._stkExpired = value;
        })
    }

    get VIN(): string {
        return this._VIN;
    }

    set VIN(value: string) {
        runInAction(() => {
            this._VIN = value;
        })
    }

    get registrationSign(): string {
        return this._registrationSign;
    }

    set registrationSign(value: string) {
        runInAction(() => {
            this._registrationSign = value;
        })
    }

    get handicappedUserCount(): number {
        return this._handicappedUserCount;
    }

    set handicappedUserCount(value: number) {
        runInAction(() => {
            this._handicappedUserCount = value;
        })
    }

    get euro(): EuroStandard {
        return this._euro;
    }

    set euro(value: EuroStandard) {
        runInAction(() => {
            this._euro = value;
        })
    }

    get amenities(): Amenities[] {
        return this._amenities;
    }

    set amenities(value: Amenities[]) {
        runInAction(() => {
            this._amenities = value;
        })
    }

    get frontPhoto(): Photo | null {
        return this._frontPhoto;
    }

    set frontPhoto(value: Photo | null) {
        runInAction(() => {
            this.frontPhotoIsValid = true;
            this._frontPhoto = value;
        })
    }

    get rearPhoto(): Photo | null {
        return this._rearPhoto;
    }

    set rearPhoto(value: Photo | null) {
        runInAction(() => {
            this.rearPhotoIsValid = true;
            this._rearPhoto = value;
        })
    }

    get leftSidePhoto(): Photo | null {
        return this._leftSidePhoto;
    }

    set leftSidePhoto(value: Photo | null) {
        runInAction(() => {
            this.leftSidePhotoIsValid = true;
            this._leftSidePhoto = value;
        })
    }

    get rightSidePhoto(): Photo | null {
        return this._rightSidePhoto;
    }

    set rightSidePhoto(value: Photo | null) {
        runInAction(() => {
            this.rightSidePhotoIsValid = true;
            this._rightSidePhoto = value;
        })
    }

    get interierPhoto1(): Photo | null {
        return this._interierPhoto1;
    }

    set interierPhoto1(value: Photo | null) {
        runInAction(() => {
            this.interierPhoto1IsValid = true;
            this._interierPhoto1 = value;
        })
    }

    get interierPhoto2(): Photo | null {
        return this._interierPhoto2;
    }

    set interierPhoto2(value: Photo | null) {
        runInAction(() => {
            this.interierPhoto2IsValid = true;
            this._interierPhoto2 = value;
        })
    }

    get technicalCertificate1(): Photo | null {
        return this._technicalCertificate1;
    }

    set technicalCertificate1(value: Photo | null) {
        runInAction(() => {
            this.technicalCertificatePhoto1IsValid = true;
            this._technicalCertificate1 = value;
        })
    }

    get technicalCertificate2(): Photo | null {
        return this._technicalCertificate2;
    }

    set technicalCertificate2(value: Photo | null) {
        runInAction(() => {
            this.technicalCertificatePhoto2IsValid = true;
            this._technicalCertificate2 = value;
        })
    }

    get insurancePhoto(): Photo | null {
        return this._insurancePhoto;
    }

    set insurancePhoto(value: Photo | null) {
        runInAction(() => {
            this.insurancePhotoIsValid = true;
            this._insurancePhoto = value;
        })
    }

    get departureStation(): Place | null {
        return this._departureStation;
    }

    set departureStation(value: Place | null) {
        runInAction(() => {
            this.departureStationIsValid = true;
            this._departureStation = value;
        })
    }

    get personsCapacity(): number {
        return this._personsCapacity;
    }

    set personsCapacity(value: number) {
        runInAction(() => {
            this.personsCapacityIsValid = true;
            this._personsCapacity = value;
        })
    }
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        runInAction(() => {
            this.nameIsValid = true;
            this._name = value;
        })
    }

    @computed
    get isValid() {
        return this.nameIsValid && this.personsCapacityIsValid &&
            this.frontPhotoIsValid && this.rearPhotoIsValid && this.leftSidePhotoIsValid && this.rightSidePhotoIsValid &&
            this.registrationSignIsValid && this.vinIsValid && this.stkExpiredIsValid && this.yearOfManufactureIsValid &&
            this.technicalCertificatePhoto1IsValid && this.insurancePhotoIsValid && this.interierPhoto1IsValid && this.interierPhoto2IsValid;
    }

    @action
    public validate() {
        if (this._name === "") {
            this.nameIsValid = false;
        }
        if (this._registrationSign === "") {
            this.registrationSignIsValid = false;
        }
        if (this._VIN === "") {
            this.vinIsValid = false;
        }
        if (this._stkExpired === null) {
            this.stkExpiredIsValid = false;
        }
        if (this._yearOfManufacture === 0) {
            this.yearOfManufactureIsValid = false;
        }
        if (this._personsCapacity <= 0) {
            this.personsCapacityIsValid = false;
        }
        if (this._frontPhoto === null) {
            this.frontPhotoIsValid = false;
        }
        if (this._rearPhoto === null) {
            this.rearPhotoIsValid = false;
        }
        if (this._leftSidePhoto === null) {
            this.leftSidePhotoIsValid = false;
        }
        if (this._rightSidePhoto === null) {
            this.rightSidePhotoIsValid = false;
        }
        if (this._interierPhoto1 === null) {
            this.interierPhoto1IsValid = false;
        }
        if (this._interierPhoto2 === null) {
            this.interierPhoto2IsValid = false;
        }
        if (this._technicalCertificate1 === null) {
            this.technicalCertificatePhoto1IsValid = false;
        }
        if (this._technicalCertificate2 === null) {
            this.technicalCertificatePhoto2IsValid = false;
        }
        if (this._insurancePhoto === null) {
            this.insurancePhotoIsValid = false;
        }
        if (this._departureStation === null || !this._departureStation.hasPlace) {
            this.departureStationIsValid = false;
        }
    }
}