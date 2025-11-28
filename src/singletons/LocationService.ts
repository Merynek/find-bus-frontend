import {Priority, Semaphore} from "../utils/semaphore";
import {debouncedFn} from "../utils/common";
import {Place} from "../data/place";
import {MapboxUtils} from "./MapboxUtils";
import {IDirectionData} from "../data/trip/direction";
import {GeoPoint} from "@/src/data/geoPoint";

export class LocationService {
    private static _instance: LocationService | null = null;
    private readonly _mapboxUtils: MapboxUtils;
    private _semaphore: Semaphore;
    private readonly _timeout: number;
    private _directionsMap: Map<string, IDirectionData>;

    constructor() {
        this._timeout = 200;
        this._mapboxUtils = new MapboxUtils();
        this._semaphore = new Semaphore(1);
        this._directionsMap = new Map<string, IDirectionData>();
    }

    public static get instance(): LocationService {
        if (!LocationService._instance) {
            LocationService._instance = new LocationService();
        }
        return LocationService._instance;
    }

    public async searchPlace(searchText: string): Promise<Place[]> {
        return await this._mapboxUtils.searchPlaces(searchText);
    }

    public async searchByCoordinate(point: GeoPoint): Promise<Place|null> {
        return await this._mapboxUtils.searchByCoordinate(point);
    }

    public async getDirectionData(from: Place, to: Place, priority: Priority): Promise<IDirectionData> {
        return this._semaphore.add({
            id: "",
            priority: priority,
            process: () => debouncedFn(async () => {
                if (from.point && to.point) {
                    const pointKey = `${from.point.toString()}-${to.point.toString()}`;
                    let data = this._directionsMap.get(pointKey);
                    if (!data) {
                        data = await this._mapboxUtils.getDirectionData(from.point, to.point);
                        this._directionsMap.set(pointKey, data);
                    }
                    return data
                }
                return {};
            }, this.getTimeOut(priority))
        })
    }

    private getTimeOut(priority: Priority): number {
        return priority === Priority.HIGH ? 0 : this._timeout;
    }
}