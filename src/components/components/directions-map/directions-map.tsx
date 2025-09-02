import React from "react";
import {observer} from "mobx-react";
import {IMapBoxProps} from "../map-box/map-box";
import {Direction} from "@/src/data/trip/direction";
import dynamic from "next/dynamic";
import {LoaderArea} from "@/src/components/components/loader-area/loader-area";

const MapBox = dynamic(() => import("../map-box/map-box"), {
    ssr: false,
    loading: () => <LoaderArea />,
});

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