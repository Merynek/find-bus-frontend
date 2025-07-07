import {UserRole} from "../../api/openapi";

export interface IUserSettings {
    id: number;
    email: string;
    role: UserRole;
}

export class User {
    public id: number;
    public email: string;
    public role: UserRole;

    constructor(settings: IUserSettings) {
        this.id = settings.id;
        this.email = settings.email;
        this.role = settings.role;
    }
}