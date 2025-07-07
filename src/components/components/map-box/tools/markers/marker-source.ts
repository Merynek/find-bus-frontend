import {Map} from "mapbox-gl";
import {MapBoxSources} from "@/src/enums/map-box.enum";
import { IMapMarker } from "../../map-box-types";

export const initMarkerSource = (map: Map, markers: IMapMarker[]) => {
    map.addSource(MapBoxSources.MARKERS, {
        "type": "geojson",
        data: createMarkersData(markers)
    })
}

export const updateMarkerSource = (map: Map, markers: IMapMarker[]) => {
    const markersSource = map.getSource(MapBoxSources.MARKERS);
    if (markersSource && markersSource.type === "geojson") {
        markersSource.setData(createMarkersData(markers));
    }
}

const createMarkersData = (markers: IMapMarker[]): GeoJSON.FeatureCollection<GeoJSON.Geometry> => {
    return {
        'type': 'FeatureCollection',
        'features': markers.map(marker => {
            return {
                type: "Feature",
                geometry: {
                    type: 'Point',
                    coordinates: marker.position ? [marker.position.lng, marker.position.lat] : [],
                },
                properties: {
                }
            }
        })
    }
}


