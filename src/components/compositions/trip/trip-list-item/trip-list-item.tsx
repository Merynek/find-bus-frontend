import React, {useState} from "react";
import styles from "./trip-list-item.module.scss";
import {formatDateTime} from "@/src/utils/date-time.format";
import {cn, getFormattedDistance} from "@/src/utils/common";
import {Countdown} from "../../../components/countdown/countdown";
import {TripOfferState, UserRole} from "@/src/api/openapi";
import {ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {Route} from "@/src/data/trip/route";
import {TripItem} from "@/src/data/tripItem";
import {ROUTES} from "@/src/enums/router.enum";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "../../../components/icon/icon";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {TripAmenities} from "@/src/components/compositions/trip/trip-amenities/trip-amenities";

export interface ITripListItemProps {
    tripItem: TripItem;
}

export const TripListItem = (props: ITripListItemProps) => {
    const {tripItem} = props;
    const {user} = useLoggedUser();
    const locale = useCurrentLocale();
    const [offerHasEnded, setOfferHasEnded] = useState(tripItem.offerHasEnded);

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
                    <span>Z - {route.from.place.name}</span>
                </div>
                <div className={styles.line}>
                    <span>Do - {route.to.place.name}</span>
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

    return <div className={cn(styles.layout, offerHasEnded && styles.end, hasOffersForAccept() && styles.offers)}>
        <ButtonLink
            route={{
                route: ROUTES.TRIP,
                params: { tripId: tripItem.id.toString() }
            }}
            label={"Zobrazit detail"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <div className={styles.line}>
            <span>ID:</span>
            <span>{tripItem.id}</span>
        </div>
        {!offerHasEnded && <div>
            <span>Odpočet:</span>
            <Countdown
                deadLine={tripItem.endOffer}
                onDone={() => {
                    setOfferHasEnded(true);
                }}
            />
        </div>}
        {user?.role === UserRole.TRANSPORTER && _renderForTransporter()}
        <div className={styles.line}>
            <span>Nabídka končí:</span>
            <span>{formatDateTime({
                date: tripItem.endOffer,
                locale: locale
            })}</span>
        </div>
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