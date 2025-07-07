import {bbox, points} from "@turf/turf";
import {Map} from "mapbox-gl";
import {initDirectionSource, updateDirectionSource} from "./directions/direction-source";
import {initDirectionLayers} from "./directions/direction-layers";
import {loadMarkersIcons} from "./markers/marker-icons-loader";
import {initMarkerSource, updateMarkerSource} from "./markers/marker-source";
import {initMarkerLayers} from "./markers/marker-layers";
import {GeoPoint} from "@/src/data/geoPoint";
import { IMapMarker } from "../map-box-types";

export class MapBoxApi {
    public static async initMapImages(map: Map): Promise<void> {
        await loadMarkersIcons(map);
    }

    public static initMapBoxMarkers(map: Map, markers: IMapMarker[]) {
        initMarkerSource(map, markers);
        initMarkerLayers(map);
    }

    public static updateMapBoxMarkers(map: Map, markers: IMapMarker[]) {
        updateMarkerSource(map, markers);
    }

    public static initMapBoxDirection(map: Map, polyLines: string[]) {
        initDirectionSource(map, polyLines);
        initDirectionLayers(map);
    }

    public static updateMapBoxDirection(map: Map, polyLines: string[]) {
        updateDirectionSource(map, polyLines);
    }

    public static fitCenter(map: Map, geoPoints: GeoPoint[]) {
        const coords: [number, number][] = [];
        if (geoPoints.length === 0) {
            return;
        }
        if (geoPoints.length === 1) {
            map.setCenter(geoPoints[0]);
            return;
        }

        geoPoints.forEach(point => {
            coords.push([point.lng, point.lat])
        })
        const [minLng, minLat, maxLng, maxLat] = bbox(points(coords));
        map.fitBounds([
            [minLng, minLat],
            [maxLng, maxLat]
        ], {duration: 0, padding: 40});
    }

    public static flyToPoint(map: Map, point: GeoPoint) {
        map.flyTo({
            center: {
                lat: point.lat,
                lng: point.lng
            },
            animate: true,
            zoom: 11
        })
    }
}