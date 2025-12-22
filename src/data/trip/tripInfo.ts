interface ITripInfo {
    id: number;
    name: string;
    numberOfPersons: number;
    totalDistanceInMeters: number;
    created: Date;
}

export class TripInfo {
    public id: number;
    public name: string;
    public numberOfPersons: number;
    public totalDistanceInMeters: number;
    public created: Date;

    constructor(settings: ITripInfo) {
        this.id = settings.id;
        this.name = settings.name;
        this.numberOfPersons = settings.numberOfPersons;
        this.totalDistanceInMeters = settings.totalDistanceInMeters;
        this.created = settings.created;
    }
}