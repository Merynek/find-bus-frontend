import {MarkerLayers} from "@/src/enums/map-box.enum";
import {SymbolLayout} from "mapbox-gl";
import {MarkersIconImageMap} from "./markers-icons-map";

const getBaseLayout = (layer: MarkerLayers): SymbolLayout => {
    return {
        "icon-anchor": "bottom",
        'icon-image': MarkersIconImageMap.get(layer),
    }
}

export const SymbolLayoutMap = new Map<MarkerLayers, SymbolLayout>([
    [
        MarkerLayers.PLACE,
        getBaseLayout(MarkerLayers.PLACE)
    ]
]);