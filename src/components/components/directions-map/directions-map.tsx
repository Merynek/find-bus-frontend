import React from "react";
import {observer} from "mobx-react";
import {IMapBoxProps, MapBox} from "../map-box/map-box";
import {Direction} from "@/src/data/trip/direction";

export interface IDirectionsMapProps extends Omit<IMapBoxProps, "polyLines"> {
    directions: Direction[];
}

export const DirectionsMap = observer((props: IDirectionsMapProps) => {
    const {directions} = props;
    const polyLines = directions.map(d => d.polyline).map(p => p);
    return <MapBox
        {...props}
        polyLines={polyLines}
    />
});