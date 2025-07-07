import {observer} from "mobx-react";
import {Stop} from "@/src/data/trip/stop";
import {Trip} from "@/src/data/trip/trip";
import React from "react";
import styles from "./trip-stop.module.scss";
import {cn} from "@/src/utils/common";
import {TripPlaceName} from "../trip-place-name/trip-place-name";
import {Icon} from "../../../../components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";

export interface ITripStopProps {
    stop: Stop;
    trip: Trip;
}

export const TripStop = observer((props: ITripStopProps) => {
    const {stop, trip} = props;

    const _renderName = () => {
        return <div className={styles.placeName}>
            <TripPlaceName
                stop={stop}
                trip={trip}
            />
        </div>
    }

    return <div tabIndex={-1} className={styles.layout}>
        <div className={styles.contentWrap}>
            <Icon
                icon={IconType.LOCATION_ON}
            />
            <div className={cn(styles.middleSection)}>
                {_renderName()}
            </div>
        </div>
    </div>
});