import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripRouteCreate} from "@/src/components/compositions/trip/trip-route/trip-route-create/trip-route-create";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {removeOnIndex} from "@/src/utils/common";
import React from "react";
import {useTranslate} from "@/src/hooks/translateHook";
import {observer} from "mobx-react";
import {Trip} from "@/src/data/trip/trip";

interface ICreateTripRoutesProps {
    trip: Trip;
}

export const CreateTripRoutes = observer((props: ICreateTripRoutesProps) => {
    const {trip} = props;
    const {t} = useTranslate("page.trip");

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24} style={{flex: 1}}>
        {trip.routes.map((route, index) => {
            return <LayoutFlexColumn key={index} gap={FlexGap.SMALL_16}>
                <TripRouteCreate
                    route={route}
                    trip={trip}
                />
                <ButtonClick
                    controlled={true}
                    size={ButtonSize.BY_CONTENT}
                    label={t("removeRoute")}
                    type={ButtonType.YELLOW}
                    onClick={() => {
                        removeOnIndex(trip.routes, index);
                    }}
                />
            </LayoutFlexColumn>
        })}
        <ButtonClick
            controlled={true}
            size={ButtonSize.BY_CONTENT}
            label={t("addRoute")}
            type={ButtonType.YELLOW}
            onClick={() => {
                trip.addRoute();
            }}
        />
    </LayoutFlexColumn>
});