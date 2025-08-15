import {Map as MapBoxMap} from "mapbox-gl";
import {lineString} from "@turf/helpers";
import PolylineDecoder from "@mapbox/polyline";
import {MapBoxSources} from "@/src/enums/map-box.enum";

const computedPolyLinesMap = new Map<string, number[][]>();

export const initDirectionSource = (map: MapBoxMap, polyLines: string[]) => {
    map.addSource(MapBoxSources.DIRECTIONS, {
        "type": "geojson",
        data: createDirectionsData(polyLines)
    })
}

export const updateDirectionSource = (map: MapBoxMap, polyLines: string[]) => {
    const markersSource = map.getSource(MapBoxSources.DIRECTIONS);

    if (markersSource && markersSource.type === "geojson") {
        markersSource.setData(createDirectionsData(polyLines));
    }
}

const createDirectionsData = (polyLines: string[]): GeoJSON.Feature<GeoJSON.LineString> => {
    const route: number[][] = [];
    polyLines.forEach(line => {
        if (line) {
            const decoded = decodePolyline(line);
            const flippedLngLat = decoded.map(([lat, lng]) => [lng, lat]);
            const json = lineString(flippedLngLat);
            route.push(...json.geometry.coordinates);
        }
    })

    return {
        'type': 'Feature',
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: route
        }
    }
}

const decodePolyline = (encodedPolyLine: string): number[][] => {
    try {
        let decoded = computedPolyLinesMap.get(encodedPolyLine);
        if (!decoded) {
            decoded = PolylineDecoder.decode(encodedPolyLine);
            computedPolyLinesMap.set(encodedPolyLine, decoded);
        }
        return decoded;
    } catch (e: unknown) {
        console.error("Error during decoding polyline", JSON.stringify(e));
        return [];
    }
}


