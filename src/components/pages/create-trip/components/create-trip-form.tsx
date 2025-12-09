import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {observer} from "mobx-react";
import {CreateTripPageStore} from "@/src/components/pages/create-trip/create-trip.page.store";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {DatePicker} from "@/src/components/components/inputs/date-picker/date-picker";
import {CheckBox} from "@/src/components/components/inputs/check-box/check-box";
import {SelectTripAmenities} from "@/src/components/compositions/trip/trip-amenities/select-trip-amenities";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {CreateTripRoutes} from "@/src/components/pages/create-trip/components/create-trip-recommendation";
import {CreateTripRecommendations} from "@/src/components/pages/create-trip/components/create-trip-routes";
import {GeoPoint} from "@/src/data/geoPoint";
import {DirectionsMap} from "@/src/components/components/directions-map/directions-map";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";

interface ICreateTripFormProps {
    store: CreateTripPageStore;
    config: AppBusinessConfig;
}

export const CreateTripForm = observer((props: ICreateTripFormProps) => {
    const {store, config} = props;
    const {t} = useTranslate("page.trip");
    const locale = useCurrentLocale();

    return <>
        <TextBox
            placeholder={t("name")}
            controlled={true}
            type={TextBoxType.TEXT}
            value={store.trip.name}
            onChange={(val) => {
                store.trip.name = val;
            }}
        />
        <NumberBox
            placeholder={t("handicappedUserCount")}
            controlled={true}
            value={store.trip.handicappedUserCount}
            onChange={(val) => {
                store.trip.handicappedUserCount = val;
            }}
            minValue={0}
        />
        <DatePicker
            controlled={true}
            value={store.trip.endOrder}
            onChange={(val) => {
                if (val) {
                    store.trip.endOrder = val;
                }
            }}
            placeholderText={t("endDemand")}
            showTimeSelect={true}
            locale={locale}
        />
        <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            {!store.endOrderIsValid && <p style={{color: "red"}}>Min EndOrder From Now is {config.minEndOrderFromNowInHours} in Hours</p>}
            {!store.endOrderWithStartTripIsValid && <p style={{color: "red"}}>Min diff between EndOrder and StartTrip is {config.minDiffBetweenStartTripAndEndOrderInHours} in Hours</p>}
        </LayoutFlexColumn>
        <NumberBox
            placeholder={t("numberOfPassengers")}
            controlled={true}
            value={store.trip.numberOfPersons}
            onChange={(val) => {
                store.trip.numberOfPersons = val;
            }}
            minValue={0}
        />
        <CheckBox
            controlled={true}
            label={t("dietForTransporter")}
            checked={store.trip.dietForTransporter}
            onChange={(val) => store.trip.dietForTransporter = val}
        />
        <SelectTripAmenities trip={store.trip}/>
        <LayoutFlexRow>
            <CreateTripRoutes trip={store.trip}/>
            {store.displayRecommendation && <CreateTripRecommendations store={store}/>}
        </LayoutFlexRow>
        <div style={{position: "relative", width: "100%", height: "300px"}}>
            <DirectionsMap
                polyLines={store.trip.directions.map(d => d.polyline).map(p => p)}
                markers={store.trip.markers}
                center={store.trip.stops.map(s => s.place.point).filter<GeoPoint>((p) : p is GeoPoint => p !== undefined)}
                initialView={{
                    zoom: 11
                }}
            />
        </div>
    </>
});