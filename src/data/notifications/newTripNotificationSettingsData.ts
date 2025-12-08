
interface INewTripSettingsData {
    radiusInMeters: number;
}

export class NewTripSettingsData {
    public radiusInMeters: number;

    constructor(data: INewTripSettingsData) {
        this.radiusInMeters = data.radiusInMeters;
    }
}