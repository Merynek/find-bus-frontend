import {IUserDetailSettings, UserDetail} from "./user-detail";
import {UserConfig} from "@/src/data/userConfig";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";

export interface IUserAdminDetailSettings extends IUserDetailSettings {
    email: string;
    isActive: boolean;
    isBanned: boolean;
    phoneNumber: string;
    vehicles: Vehicle[];
    userFinancialSettings: UserFinancialSettings;
    transportRequirementsId: number|null;
    userConfigs: UserConfig[];
}

export class UserAdminDetail extends UserDetail {
    public email: string;
    public isActive: boolean;
    public isBanned: boolean;
    public userFinancialSettings: UserFinancialSettings;
    public phoneNumber: string;
    public vehicles: Vehicle[];
    public transportRequirementsId: number|null;
    public userConfigs: UserConfig[];

    constructor(settings: IUserAdminDetailSettings) {
        super(settings);
        this.email = settings.email;
        this.isActive = settings.isActive;
        this.isBanned = settings.isBanned;
        this.phoneNumber = settings.phoneNumber;
        this.userFinancialSettings = settings.userFinancialSettings;
        this.vehicles = settings.vehicles;
        this.transportRequirementsId = settings.transportRequirementsId;
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