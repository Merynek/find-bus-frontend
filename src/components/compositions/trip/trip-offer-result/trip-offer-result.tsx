import React from "react";
import {observer} from "mobx-react";
import styles from "./trip-offer-result.module.scss";
import {Trip} from "@/src/data/trip/trip";
import {TripOffer} from "../trip-offer/trip-offer";
import {CurrentUser} from "@/src/singletons/current-user";
import {UserRole} from "@/src/api/openapi";
import {Offer} from "@/src/data/offer";
import {useBean} from "ironbean-react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";

export interface ITripOfferResultProps {
    trip: Trip;
    offers: Offer[];
}

export const TripOfferResult = observer((props: ITripOfferResultProps) => {
    const {trip, offers} = props;
    const _currentUser = useBean(CurrentUser);

    const _renderLabel = () => {
        return _currentUser.role === UserRole.TRANSPORTER ? <h2>Vyhraná nabídka</h2> : <h2>Přijatá nabídka</h2>;
    }

    const getOffer = (): Offer|undefined =>{
        return Boolean(offers.length) ? offers.find(o => o.accepted) : undefined;
    }

    const offer = getOffer();

    return trip.offerHasEnded && offer ? <LayoutFlexColumn>
        {_renderLabel()}
        <TripOffer offer={offer}/>
    </LayoutFlexColumn> : <></>
});