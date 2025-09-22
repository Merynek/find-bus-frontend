import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {formatTimeForTrip, hoursToSeconds} from "@/src/utils/common";
import React from "react";
import {useTranslate} from "@/src/hooks/translateHook";
import {observer} from "mobx-react";
import {TripRecommendationType} from "@/src/api/openapi";
import {
    TripRouteRecommendation
} from "@/src/components/compositions/trip/trip-route/trip-route-recommendation/trip-route-recommendation";
import {CreateTripPageStore} from "@/src/components/pages/create-trip/create-trip.page.store";

interface ICreateTripRecommendationsProps {
    store: CreateTripPageStore;
}

export const CreateTripRecommendations = observer((props: ICreateTripRecommendationsProps) => {
    const {store} = props;
    const {t} = useTranslate("component.trip");

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24} style={{flex: 1, border: "2px solid #16C15B"}}>
        <p><b>ECONOMY</b> version for one driver</p>
        {store.tripRecommendation === TripRecommendationType.ONE_DRIVER && <>{store.trip.routes.map((route, index) => {
            return <LayoutFlexColumn key={index} gap={FlexGap.SMALL_16}>
                <TripRouteRecommendation
                    route={route}
                    trip={store.trip}
                />
                <div>
                    <p>DJ: {formatTimeForTrip(hoursToSeconds(route.currentDJ), t("directionHours"), t("directionMinutes"))}</p>
                    <p>M: {formatTimeForTrip(hoursToSeconds(route.currentM), t("directionHours"), t("directionMinutes"))}</p>
                    <p>REAL: {formatTimeForTrip(route.computedDirectionInSeconds, t("directionHours"), t("directionMinutes"))}</p>
                </div>
            </LayoutFlexColumn>
        })}</>}
        {store.tripRecommendation === TripRecommendationType.TWO_DRIVERS && <div>
            <p>REDUCE ROUTE: {store.reduceRoutesHours} Hours</p>
            <p>REDUCE TIME: {store.reduceTimeHours} Hours</p>
        </div>}
    </LayoutFlexColumn>
});