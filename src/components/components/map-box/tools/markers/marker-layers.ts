import {Map} from "mapbox-gl";
import {MapBoxSources, MarkerLayers} from "@/src/enums/map-box.enum";
import {SymbolLayer} from "mapbox-gl";
import {SymbolLayoutMap} from "./symbol-layout-map";

const createLayerConfig = (layer: MarkerLayers): SymbolLayer => {
    return {
        id: layer,
        type: "symbol",
        source: MapBoxSources.MARKERS,
        layout: {
            'icon-size': 1,
            'icon-allow-overlap': true,  // The icon will be visible even if it collides with other previously drawn symbols.
            'icon-ignore-placement': true,  // Other symbols can be visible even if they collide with the icon.
            'text-optional': true,  // Label will be hidden if it collides with other labels
            ...SymbolLayoutMap.get(layer)
        },
        paint: {
            'text-color': "#FFFFFF",
        }
    }
}

export const initMarkerLayers = (map: Map) => {
    for (const type in MarkerLayers) {
        const layerType = type as MarkerLayers;
        map.addLayer(createLayerConfig(layerType));
    }
}