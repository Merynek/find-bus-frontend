import React from "react";
import {observer} from "mobx-react";
import styles from "./trip-list-item.module.scss";
import {formatDateTime} from "@/src/utils/date-time.format";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {cn, getFormattedDistance} from "@/src/utils/common";
import {Countdown} from "../../../components/countdown/countdown";
import {CurrentUser} from "@/src/singletons/current-user";
import {TripOfferState, UserRole} from "@/src/api/openapi";
import {ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {Route} from "@/src/data/trip/route";
import {TripItem} from "@/src/data/tripItem";
import {ROUTES} from "@/src/enums/router.enum";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "../../../components/icon/icon";
import {useBean} from "ironbean-react";

export interface ITripListItemProps {
    tripItem: TripItem;
}

export const TripListItem = observer((props: ITripListItemProps) => {
    const {tripItem} = props;
    const _locKey = "page.trip.";
    const _configuration = useBean(AppConfiguration);
    const _currentUser = useBean(CurrentUser);

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

    const _renderForTransporter = () => {
        return <>
            {tripItem.alreadyOffered && <div>Offer Sent!</div>}
        </>
    }

    const hasOffersForAccept = (): boolean => {
        if (_currentUser.role === UserRole.TRANSPORTER) {
            return tripItem.alreadyOffered && tripItem.offerState === TripOfferState.CREATED;
        }
        return tripItem.isMine && tripItem.hasOffers && tripItem.offerState === TripOfferState.CREATED;
    }

    return <div className={cn(styles.layout, tripItem.offerHasEnded && styles.end, hasOffersForAccept() && styles.offers)}>
        <ButtonLink
            route={{route: ROUTES.TRIP, param: tripItem.id.toString()}}
            label={"Zobrazit detail"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <div className={styles.line}>
            <span>ID:</span>
            <span>{tripItem.id}</span>
        </div>
        {!tripItem.offerHasEnded && <div>
            <span>Odpočet:</span>
            <Countdown
                deadLine={tripItem.endOffer}
                onDone={() =>{
                    tripItem.offerHasEnded = true;
                }}
            />
        </div>}
        {_currentUser.role === UserRole.TRANSPORTER && _renderForTransporter()}
        <div className={styles.line}>
            <span>Nabídka končí:</span>
            <span>{formatDateTime({
                date: tripItem.endOffer,
                locale: _configuration.locale
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
            <div>{tripItem.amenities.map(amenity => <b key={amenity}>-{amenity}-</b>)}</div>
        </div>
        <div>
            {tripItem.routes.map(_renderRoute)}
        </div>
    </div>
});