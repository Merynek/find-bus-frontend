"use client";

import React, {useState} from "react";
import styles from "./trip-list-item.module.scss";
import {formatDateTime} from "@/src/utils/date-time.format";
import {cn, getFormattedDistance} from "@/src/utils/common";
import {Countdown} from "../../../components/countdown/countdown";
import {TripItemResponseDto, TripOfferState, TripState, UserRole} from "@/src/api/openapi";
import {ButtonLink, ButtonSize, ButtonType} from "../../../components/button/button";
import {Route} from "@/src/data/trip/route";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "../../../components/icon/icon";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {TripAmenities} from "@/src/components/compositions/trip/trip-amenities/trip-amenities";
import {TripItemConverter} from "@/src/converters/trip-item-converter";

export interface ITripListItemProps {
    tripItem: TripItemResponseDto;
}

export const TripListItem = (props: ITripListItemProps) => {
    const tripItem = TripItemConverter.toInstance(props.tripItem);
    const {user} = useLoggedUser();
    const locale = useCurrentLocale();
    const [offerHasEnded, setOfferHasEnded] = useState(tripItem.orderHasEnded);
    const isDraft = tripItem.state == TripState.DRAFT;

    const _renderRoute = (route: Route, index: number) => {
        return <div key={index}>
            <div className={styles.stop}>
                <div className={styles.line}>
                    <span>Odjezd - {formatDateTime({
                        date: route.start,
                        locale: locale
                    })}</span>
                </div>
                <div className={styles.line}>
                    <span>Z - {route.from.place.displayName}</span>
                </div>
                <div className={styles.line}>
                    <span>Do - {route.to.place.displayName}</span>
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

    const _renderForTransporter = () => {
        return <>
            {tripItem.alreadyOffered && <div>Offer Sent!</div>}
        </>
    }

    const hasOffersForAccept = (): boolean => {
        if (user?.role === UserRole.TRANSPORTER) {
            return tripItem.alreadyOffered && tripItem.offerState === TripOfferState.CREATED;
        }
        return tripItem.isMine && tripItem.hasOffers && tripItem.offerState === TripOfferState.CREATED;
    }

    const renderLink = () => {
        if (isDraft) {
            return <ButtonLink
                route={{
                    route: ROUTES.DRAFT_TRIP,
                    params: {
                        [URL_PARAMS.TRIP_ID]: tripItem.id.toString()
                    }
                }}
                label={"Zobrazit koncept"}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        if (user) {
            return <ButtonLink
                route={{
                    route: ROUTES.TRIP,
                    params: { [URL_PARAMS.TRIP_ID]: tripItem.id.toString() }
                }}
                label={"Zobrazit detail"}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        return <></>;
    }

    return <div className={cn(styles.layout, offerHasEnded && styles.end, hasOffersForAccept() && styles.offers)}>
        {renderLink()}
        <div className={styles.line}>
            <span>ID:</span>
            <span>{tripItem.id}</span>
        </div>
        {!isDraft && tripItem.endOrder && !offerHasEnded && <div>
            <span>Odpočet:</span>
            <Countdown
                deadLine={tripItem.endOrder}
                onDone={() => {
                    setOfferHasEnded(true);
                }}
            />
        </div>}
        {!isDraft && user?.role === UserRole.TRANSPORTER && _renderForTransporter()}
        {!isDraft && tripItem.endOrder && <div className={styles.line}>
            <span>Nabídka končí:</span>
            <span>{formatDateTime({
                date: tripItem.endOrder,
                locale: locale
            })}</span>
        </div>}
        <div className={styles.line}>
            <span>Diety Pro řidiče:</span>
            <Icon icon={tripItem.dietForTransporter ? IconType.CHECK : IconType.CLOSE} />
        </div>
        <div>
            <span>Počet osob: </span>
            <span>{tripItem.numberOfPersons}</span>
        </div>
        <div>
            <span>Vzdálenost: </span>
            <span>{getFormattedDistance(tripItem.totalDistanceInMeters)}</span>
        </div>
        {tripItem.handicappedUserCount > 0 && <div>
            <span>Počet míst pro kryply: </span>
            <span>{tripItem.handicappedUserCount}</span>
        </div>}
        <div>
            <span>Amenities: </span>
            <TripAmenities amenities={tripItem.amenities}/>
        </div>
        <div>
            {tripItem.routes.map(_renderRoute)}
        </div>
    </div>
};