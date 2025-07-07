import {Map} from "mapbox-gl";
import {MapBoxSources, PolylineLayers} from "@/src/enums/map-box.enum";
import {LineLayer} from "mapbox-gl";

const createLayerConfig = (layer: PolylineLayers): LineLayer => {
    return {
        id: layer,
        type: "line",
        source: MapBoxSources.DIRECTIONS,
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#2ad5c5",
            "line-width": 2,
            "line-opacity": 1
        }
    }
}

export const initDirectionLayers = (map: Map) => {
    for (const type in PolylineLayers) {
        const layerType = type as PolylineLayers;
        map.addLayer(createLayerConfig(layerType));
    }
}