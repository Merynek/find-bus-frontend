import {IUserDetailSettings, UserDetail} from "./user-detail";
import {UserAddress} from "./userAddress";
import {TransferInfo} from "../transferInfo";
import {Vehicle} from "./vehicle";
import {TransportRequirements} from "../transportRequirements";
import type {AdminUserDetailResponseDto} from "@/src/api/openapi";

export interface IUserAdminDetailSettings extends IUserDetailSettings {
    email: string;
    isActive: boolean;
    isBanned: boolean;
    isVerifiedForTransporting: boolean;
    name: string;
    surname: string;
    phoneNumber: string;
    ico: string;
    dic: string;
    isCompany: boolean;
    address: UserAddress;
    mailingAddress: UserAddress;
    transferInfo: TransferInfo;
    vehicles: Vehicle[];
    transportRequirements: TransportRequirements;
}

export class UserAdminDetail extends UserDetail {
    public email: string;
    public isActive: boolean;
    public isBanned: boolean;
    public isVerifiedForTransporting: boolean;
    public name: string;
    public surname: string;
    public phoneNumber: string;
    public ico: string;
    public dic: string;
    public isCompany: boolean;
    public address: UserAddress;
    public mailingAddress: UserAddress;
    public transferInfo: TransferInfo;
    public vehicles: Vehicle[];
    public transportRequirements: TransportRequirements;

    constructor(settings: IUserAdminDetailSettings) {
        super(settings);
        this.email = settings.email;
        this.isActive = settings.isActive;
        this.isBanned = settings.isBanned;
        this.isVerifiedForTransporting = settings.isVerifiedForTransporting;
        this.name = settings.name;
        this.surname = settings.surname;
        this.phoneNumber = settings.phoneNumber;
        this.ico = settings.ico;
        this.dic = settings.dic;
        this.isCompany = settings.isCompany;
        this.address = settings.address;
        this.mailingAddress = settings.mailingAddress;
        this.transferInfo = settings.transferInfo;
        this.vehicles = settings.vehicles;
        this.transportRequirements = settings.transportRequirements;
    }

    public toJson(): AdminUserDetailResponseDto {
        return {
            id: this.id,
            email: this.email,
            active: this.isActive,
            banned: this.isBanned,
            isVerifiedForTransporting: this.isVerifiedForTransporting,
            name: this.name,
            surname: this.surname,
            phoneNumber: this.phoneNumber,
            ico: this.ico,
            dic: this.dic,
            isCompany: this.isCompany,
            address: this.address.toJson(),
            mailingAddress: this.mailingAddress.toJson(),
            transferInfo: this.transferInfo.toJson(),
            vehicles: this.vehicles.map(v => v.toJson()),
            transporterRequirements: this.transportRequirements.toJson()
        }
    }
}