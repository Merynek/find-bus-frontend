
export interface IUserConfigSettings {
    created: Date;
    tripOfferCommissionPercentage: number;
}

export class UserConfig {
    public created: Date;
    public tripOfferCommissionPercentage: number;

    constructor(settings: IUserConfigSettings) {
        this.created = settings.created;
        this.tripOfferCommissionPercentage = settings.tripOfferCommissionPercentage;
    }
}