import {GeoPoint} from "../data/geoPoint";
import Direction, { DirectionsService } from "@mapbox/mapbox-sdk/services/directions";
import GeocodingV6, {GeocodeService}  from "@mapbox/mapbox-sdk/services/geocoding-v6";
import {Place} from "../data/place";
import {Country} from "../api/openapi";
import {IDirectionData} from "../data/trip/direction";

export class MapboxUtils {
    private _directionService: DirectionsService;
    private _geocodeService: GeocodeService;

    constructor() {
        const token = this._getAccessToken();
        this._directionService = Direction({
            accessToken: token
        })
        this._geocodeService = GeocodingV6({
            accessToken: token
        })
    }

    private _getAccessToken() {
        if (process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
            return process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        }
        throw new Error('Environment variable NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not defined.');
    }

    public async searchByCoordinate(point: GeoPoint): Promise<Place|null> {
        const result = await this._geocodeService.reverseGeocode({
            longitude: point.lng,
            latitude: point.lat
        }).send();

        const results = result.body.features.map(feature => {
            const context = feature.properties.context;
            return new Place({
                placeId: feature.id,
                point: new GeoPoint({
                    lng: feature.geometry.coordinates[0],
                    lat: feature.geometry.coordinates[1]
                }),
                country: context.country?.country_code?.toUpperCase() as Country,
                name: feature.properties.name,
                placeFormatted: feature.properties.place_formatted
            })
        })
        if (results.length) {
            return results[0];
        }
        return null;
    }

    public async searchPlaces(searchText: string): Promise<Place[]> {
        try {
            const result = await this._geocodeService.forwardGeocode({
                autocomplete: true,
                query: searchText
            }).send();

            return result.body.features.map(feature => {
                const context = feature.properties.context;
                return new Place({
                    placeId: feature.id,
                    point: new GeoPoint({
                        lng: feature.geometry.coordinates[0],
                        lat: feature.geometry.coordinates[1]
                    }),
                    country: context.country?.country_code?.toUpperCase() as Country,
                    name: feature.properties.name,
                    placeFormatted: feature.properties.place_formatted
                })
            })
        } catch (e) {
            console.warn("Error during search places", JSON.stringify(e));
            return [];
        }
    }

    public async getDirectionData(from: GeoPoint, to: GeoPoint): Promise<IDirectionData> {
        try {
            const direction = await this._directionService.getDirections({
                profile: "driving-traffic",
                waypoints: [
                    {
                        coordinates: [from.lng, from.lat]
                    },
                    {
                        coordinates: [to.lng, to.lat]
                    }
                ],
                geometries: "polyline"
            }).send();
            const response = direction.body;
            return {
                polyline: response.routes[0] ? response.routes[0].geometry : undefined,
                distance: response.routes[0] ? response.routes[0].distance : undefined,
                timeInSeconds: response.routes[0] ? response.routes[0].duration : undefined
            }
        } catch (e) {
            console.warn("Error during get direction data", JSON.stringify(e));
            return {};
        }
    }
}