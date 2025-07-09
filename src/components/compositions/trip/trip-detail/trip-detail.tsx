import {Trip} from "@/src/data/trip/trip";
import React from "react";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import styles from "./trip-detail.module.scss";
import {formatDateTime} from "@/src/utils/date-time.format";
import {cn, getFormattedDistance} from "@/src/utils/common";
import {Countdown} from "../../../components/countdown/countdown";
import {observer} from "mobx-react";
import {Route} from "@/src/data/trip/route";
import {Icon} from "../../../components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";
import {useBean} from "ironbean-react";

export interface ITripDetailProps {
    trip: Trip;
}

export const TripDetail = observer((props: ITripDetailProps) => {
    const {trip} = props;
    const _locKey = "page.trip.";
    const _configuration = useBean(AppConfiguration);

    const _renderRoute = (route: Route, index: number) => {
        return <div key={index}>
            <div className={styles.stop}>
                <div className={styles.line}>
                    <span>Odjezd - {formatDateTime({
                        date: route.start,
                        locale: _configuration.locale
                    })}</span>
                </div>
                <div className={styles.line}>
                    <span>Z - {(route.from.place.name + "- " + route.from.place.placeFormatted)}</span>
                </div>
                <div className={styles.line}>
                    <span>Do - {(route.to.place.name + "- " + route.to.place.placeFormatted)}</span>
                </div>
                <div className={styles.line}>

                    <span>Přijezd - {formatDateTime({
                        date: route.end,
                        locale: _configuration.locale
                    })}</span>
                </div>
            </div>
        </div>
    }

    return <div className={cn(styles.layout, trip.offerHasEnded && styles.end)}>
        <div className={styles.line}>
            <span>ID:</span>
            <span>{trip.id}</span>
        </div>
        {!trip.offerHasEnded && <div>
            <span>Odpočet:</span>
            <Countdown
                deadLine={trip.endOrder}
                onDone={() =>{
                    trip.offerHasEnded = true;
                }}
            />
        </div>}
        <div className={styles.line}>
            <span>Nabídka končí:</span>
            <span>{formatDateTime({
                date: trip.endOrder,
                locale: _configuration.locale
            })}</span>
        </div>
        <div className={styles.line}>
            <span>Diety Pro řidiče:</span>
            <Icon icon={trip.dietForTransporter ? IconType.CHECK : IconType.CLOSE} />
        </div>
        <div>
            <span>Počet osob: </span>
            <span>{trip.numberOfPersons}</span>
        </div>
        <div>
            <span>Vzdálenost: </span>
            <span>{getFormattedDistance(trip.totalDistanceInMeters)}</span>
        </div>
        <div>
            <div>{trip.amenities.map(amenity => <b key={amenity}>-{amenity}-</b>)}</div>
        </div>
        <div>
            {trip.routes.map(_renderRoute)}
        </div>
    </div>
});