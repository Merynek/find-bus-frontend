import React, {useRef, useState} from "react";
import MapBox, {IMapBoxProps} from "./map-box";
import {GeoPoint} from "@/src/data/geoPoint";
import {getRandomPlace} from "@/dataGenerator/places/place";
import {IMapMarker} from "./map-box-types";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: MapBox,
    args: {
        withOffset: true
    }
} as Meta<IMapBoxProps>;

export const LoaderAreaStory: StoryObj<IMapBoxProps> = {
    render: () => {
        const startLat = 49.7012;
        const startLng = 17.0762;
        const markers = useRef<IMapMarker[]>([
            {
                place: getRandomPlace(),
                placeNumber: 1,
                position: new GeoPoint({ lat: startLat + (0.02), lng: startLng + (0.02) }),
            },
            {
                place: getRandomPlace(),
                placeNumber: 2,
                position: new GeoPoint({ lat: startLat + (2 * 0.02), lng: startLng + (2 * 0.02) }),
            },
            {
                place: getRandomPlace(),
                placeNumber: 3,
                position: new GeoPoint({ lat: startLat + (3 * 0.02), lng: startLng + (3 * 0.02) }),
            },
        ])

        const [places, setPlaces] = useState<IMapMarker[]>(markers.current);

        return <div style={{position: "relative"}}>
            <button
                style={{position: "absolute", top: "0"}}
                onClick={() => {
                    const lastPlace = places[places.length - 1];
                    const newPlace: IMapMarker = {
                        place: getRandomPlace(),
                        placeNumber: lastPlace.placeNumber + 1,
                        position: new GeoPoint({
                            lat: startLat + (places.length * 0.02),
                            lng: startLng + (places.length * 0.02)
                        })
                    }
                    places.push(newPlace);
                    setPlaces([...places]);
                }}>
                ADD MARKER
            </button>
            <div style={{position: "absolute", top: "60px", width: "100%", height: "600px"}} >
                <MapBox
                    markers={places}
                    polyLines={[]}
                    disableScrollZoom={false}
                    initialView={{
                        points: [new GeoPoint({
                            lat: startLat,
                            lng: startLng
                        })],
                        zoom: 11
                    }}
                />
            </div>
        </div>
    },
    args: {}
};