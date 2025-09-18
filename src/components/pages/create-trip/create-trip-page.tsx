"use client";

import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import React from "react";
import {observer} from "mobx-react";
import {CreateTripPageStore} from "./create-trip.page.store";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {CheckBox} from "../../components/inputs/check-box/check-box";
import {DatePicker} from "../../components/inputs/date-picker/date-picker";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {DirectionsMap} from "../../components/directions-map/directions-map";
import {GeoPoint} from "@/src/data/geoPoint";
import {NumberBox} from "../../components/inputs/number-box/number-box";
import {ROUTES} from "@/src/enums/router.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {useInit, useMount, useUnmount} from "@/src/hooks/lifecycleHooks";
import {useApp} from "@/src/app/contexts/AppContext";
import { useRouter } from "@/src/i18n/navigation";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {SelectTripAmenities} from "@/src/components/compositions/trip/trip-amenities/select-trip-amenities";
import {
    CreateTripRecommendations
} from "@/src/components/pages/create-trip/components/create-trip-routes";
import {CreateTripRoutes} from "@/src/components/pages/create-trip/components/create-trip-recommendation";

const CreateTripPage = observer(() => {
    const router = useRouter();
    const {showLoader, hideLoader} = useApp();
    const _store = useInit(() => new CreateTripPageStore());
    const locale = useCurrentLocale();
    const _configuration = AppConfiguration.instance;
    const {t} = useTranslate("page.trip");
    const cfg = _configuration.appBusinessConfig;

    useMount(() => {
        _store.init();
    })

    useUnmount(() => {
        _store.destroy();
    })

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24} style={{padding: "20px"}}>
        <NumberBox
            placeholder={t("handicappedUserCount")}
            controlled={true}
            value={_store.trip.handicappedUserCount}
            onChange={(val) => {
                if (val) {
                    _store.trip.handicappedUserCount = val;
                }
            }}
            minValue={0}
        />
        <DatePicker
            controlled={true}
            value={_store.trip.endOrder}
            onChange={(val) => {
                if (val) {
                    _store.trip.endOrder = val;
                }
            }}
            placeholderText={t("endDemand")}
            showTimeSelect={true}
            locale={locale}
        />
        <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            {!_store.endOrderIsValid && <p style={{color: "red"}}>Min EndOrder From Now is {cfg.minEndOrderFromNowInHours} in Hours</p>}
            {!_store.endOrderWithStartTripIsValid && <p style={{color: "red"}}>Min diff between EndOrder and StartTrip is {cfg.minDiffBetweenStartTripAndEndOrderInHours} in Hours</p>}
        </LayoutFlexColumn>
        <NumberBox
            placeholder={t("numberOfPassengers")}
            controlled={true}
            value={_store.trip.numberOfPersons}
            onChange={(val) => {
                if (val) {
                    _store.trip.numberOfPersons = val;
                }
            }}
            minValue={0}
        />
        <CheckBox
            controlled={true}
            label={t("dietForTransporter")}
            checked={_store.trip.dietForTransporter}
            onChange={(val) => _store.trip.dietForTransporter = val}
        />
        <SelectTripAmenities trip={_store.trip}/>
        <LayoutFlexRow>
            <CreateTripRoutes trip={_store.trip}/>
            {_store.displayRecommendation && <CreateTripRecommendations store={_store}/>}
        </LayoutFlexRow>
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <ButtonClick
                controlled={true}
                size={ButtonSize.BY_CONTENT}
                label={t("createDemand")}
                type={ButtonType.BLACK}
                onClick={async () => {
                    let errors = "";
                    _store.validate();
                    if (!_store.isValid) {
                        if (!_store.placesAreSet) {
                            errors += " @ All places are required, "
                        }
                        if (!_store.peopleCountIsValid) {
                            errors += " @ Minimum count of people is 1, "
                        }
                        if (!_store.routesCountIsValid) {
                            errors += " @ Minimum count of routes is 1"
                        }
                        if (!_store.userSettings?.isValidForCreateInvoice) {
                            errors += " @ settings are not valid"
                        }
                        alert(errors);
                    } else {
                        try {
                            showLoader();
                            await _store.createTrip();
                            hideLoader();
                            router.push(ROUTES.TRIP_LIST);
                        }
                        catch (e) {
                            console.log("error during create trip", JSON.stringify(e));
                        }
                    }
                }}
            />
        </LayoutFlexColumn>
        <div style={{position: "relative", width: "100%", height: "300px"}}>
            <DirectionsMap
                directions={_store.trip.directions}
                markers={_store.trip.markers}
                center={_store.trip.stops.map(s => s.place.point).filter<GeoPoint>((p) : p is GeoPoint => p !== undefined)}
                initialView={{
                    zoom: 11
                }}
            />
        </div>
    </LayoutFlexColumn>
});

export default CreateTripPage;