import {IUserDetailSettings, UserDetail} from "./user-detail";
import {TransportRequirements} from "../transportRequirements";
import {UserConfig} from "@/src/data/userConfig";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";

export interface IUserAdminDetailSettings extends IUserDetailSettings {
    email: string;
    isActive: boolean;
    isBanned: boolean;
    isVerifiedForTransporting: boolean;
    phoneNumber: string;
    vehicles: Vehicle[];
    userFinancialSettings: UserFinancialSettings;
    transportRequirements: TransportRequirements;
    userConfigs: UserConfig[];
}

export class UserAdminDetail extends UserDetail {
    public email: string;
    public isActive: boolean;
    public isBanned: boolean;
    public isVerifiedForTransporting: boolean;
    public userFinancialSettings: UserFinancialSettings;
    public phoneNumber: string;
    public vehicles: Vehicle[];
    public transportRequirements: TransportRequirements;
    public userConfigs: UserConfig[];

    constructor(settings: IUserAdminDetailSettings) {
        super(settings);
        this.email = settings.email;
        this.isActive = settings.isActive;
        this.isBanned = settings.isBanned;
        this.isVerifiedForTransporting = settings.isVerifiedForTransporting;
        this.phoneNumber = settings.phoneNumber;
        this.userFinancialSettings = settings.userFinancialSettings;
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