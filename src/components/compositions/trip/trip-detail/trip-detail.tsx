"use client"

import {useInit} from "@/src/hooks/lifecycleHooks";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {TripResponseDto} from "@/src/api/openapi";
import React from "react";
import styles from "./trip-detail.module.scss";
import {formatDateTime} from "@/src/utils/date-time.format";
import {cn, getFormattedDistance} from "@/src/utils/common";
import {Countdown} from "../../../components/countdown/countdown";
import {Route} from "@/src/data/trip/route";
import {Icon} from "../../../components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {observer} from "mobx-react";
import {UserReviews} from "@/src/components/compositions/reviews/user-reviews/user-reviews";

export interface ITripDetailProps {
    trip: TripResponseDto;
}

export const TripDetail = observer((props: ITripDetailProps) => {
    const trip = useInit(() => TripConverter.toInstance(props.trip));
    const locale = useCurrentLocale();

    const _renderRoute = (route: Route, index: number) => {
        return <div key={index}>
            <div className={styles.stop}>
                <div className={styles.line}>
                    <span>Název - {trip.name}</span>
                </div>
                <div className={styles.line}>
                    <span>Odjezd - {formatDateTime({
                        date: route.start,
                        locale: locale
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
                        locale: locale
                    })}</span>
                </div>
            </div>
        </div>
    }

    return <div className={cn(styles.layout, trip.orderHasEnded && styles.end)}>
        <div className={styles.line}>
            <span>ID:</span>
            <span>{trip.id}</span>
        </div>
        {trip.endOrder && !trip.orderHasEnded && <div>
            <span>Odpočet:</span>
            <Countdown
                deadLine={trip.endOrder}
                onDone={() =>{
                    trip.orderHasEnded = true;
                }}
            />
        </div>}
        {trip.endOrder && <div className={styles.line}>
            <span>Nabídka končí:</span>
            <span>{formatDateTime({
                date: trip.endOrder,
                locale: locale
            })}</span>
        </div>}
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
        <UserReviews userId={trip.ownerId} />
    </div>
});