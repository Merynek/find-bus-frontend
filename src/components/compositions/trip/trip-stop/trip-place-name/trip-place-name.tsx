import {runInAction} from "mobx";
import {cn} from "@/src/utils/common";
import React from "react";
import styles from "./trip-place-name.module.scss";
import {observer} from "mobx-react";
import {Stop} from "@/src/data/trip/stop";
import {Trip} from "@/src/data/trip/trip";
import {PlaceManager} from "@/src/singletons/place-manager";
import {PlaceAutocomplete} from "../../../../components/inputs/place-autocomplete/place-autocomplete";
import {useBean} from "ironbean-react";
import {useTranslate} from "@/src/hooks/translateHook";

export interface ITripPlaceNameProps {
    stop: Stop;
    trip: Trip;
}

export const TripPlaceName = observer((props: ITripPlaceNameProps) => {
    const {stop, trip} = props;
    const _placeManager = useBean(PlaceManager);
    const {t} = useTranslate();
    const _locKey = "component.placeName.";

    return <div className={cn(styles.placeName, styles.autocomplete)}>
        <PlaceAutocomplete
            place={stop.place}
            onChange={(place) => {
                runInAction(() => {
                    if (place) {
                        stop.place = _placeManager.add(place);
                    }
                })
            }}
        />
    </div>
});