import {IUserDetailSettings, UserDetail} from "./user-detail";

export interface IUserAdminItem extends IUserDetailSettings {
    email: string;
    isActive: boolean;
    isBanned: boolean;
}

export class UserAdminItem extends UserDetail {
    public email: string;
    public isActive: boolean;
    public isBanned: boolean;

    constructor(settings: IUserAdminItem) {
        super(settings);
        this.email = settings.email;
        this.isActive = settings.isActive;
        this.isBanned = settings.isBanned;
    }
}