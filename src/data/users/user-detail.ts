
export interface IUserDetailSettings {
    id: number;
}

export class UserDetail {
    public id: number;

    constructor(settings: IUserDetailSettings) {
        this.id = settings.id;
    }
}