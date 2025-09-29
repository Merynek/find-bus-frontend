import {IUserDetailSettings, UserDetail} from "./user-detail";
import {UserAddress} from "./userAddress";
import {TransferInfo} from "../transferInfo";
import {Vehicle} from "./vehicle";
import {TransportRequirements} from "../transportRequirements";
import {UserConfig} from "@/src/data/userConfig";

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
    userConfigs: UserConfig[];
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
    public userConfigs: UserConfig[];

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
        this.userConfigs = settings.userConfigs;
    }

    get currentConfig(): UserConfig|undefined {
        if (!this.userConfigs || this.userConfigs.length === 0) {
            return undefined;
        }

        const sortedConfigs = [...this.userConfigs].sort((a, b) =>
            b.created.getTime() - a.created.getTime()
        );
        return sortedConfigs[0];
    }

    get previousConfigs(): UserConfig[] {
        const current = this.currentConfig;

        return this.userConfigs.filter(config =>
            config !== current
        );
    }
}