import {Popup} from "@/src/components/components/popup/popup";
import React from "react";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "@/src/components/components/icon/icon";
import {Map} from "@/src/components/components/map/map";
import {GeoPoint} from "@/src/data/geoPoint";
import {LocationService} from "@/src/singletons/LocationService";
import {Place} from "@/src/data/place";
import {TInitView} from "@/src/components/components/map-box/map-box";
import {Country} from "@/src/api/openapi";
import {IMapMarker} from "@/src/components/components/map-box/map-box-types";

interface IMapPickerProps {
    id: string;
    onChange: (place: Place) => void;
    place?: Place;
}

export const MapPicker = (props: IMapPickerProps) => {
    const {onChange, id, place} = props;

    const getInitView = (): TInitView => {
        if (place && place.point) {
            return {
                points: [place.point],
                zoom: 11
            }
        }
        return {
            countries: [Country.CZ],
            zoom: 11
        }
    }

    const createMarker = (): IMapMarker|null => {
        if (place && place.point) {
            return {
                position: place.point,
                place: place,
                placeNumber: 0
            }
        }
        return null;
    }

    const marker = createMarker();

    return <Popup opener={<Icon icon={IconType.MAP} />} id={id}>
        {(close) => {
            return <div style={{position: "relative", width: "300px", height: "300px"}}>
                <Map
                    polyLines={[]}
                    markers={marker ? [marker] : []}
                    initialView={getInitView()}
                    onClick={async (lngLat) => {
                        const point = new GeoPoint({lng: lngLat.lng, lat: lngLat.lat});
                        const place = await LocationService.instance.searchByCoordinate(point);
                        if (place) {
                            onChange(place);
                            close();
                        }
                    }}
                />
            </div>
        }}
    </Popup>
}