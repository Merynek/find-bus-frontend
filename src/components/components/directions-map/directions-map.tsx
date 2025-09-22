import React from "react";
import {IMapBoxProps} from "../map-box/map-box";
import dynamic from "next/dynamic";
import {LoaderArea} from "@/src/components/components/loader-area/loader-area";

const MapBox = dynamic(() => import("../map-box/map-box"), {
    ssr: false,
    loading: () => <LoaderArea />,
});

export const DirectionsMap = (props: IMapBoxProps) => {
    return <MapBox
        {...props}
    />
};