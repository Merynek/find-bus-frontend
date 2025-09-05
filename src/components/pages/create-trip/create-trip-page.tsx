"use client";

import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import React from "react";
import {observer} from "mobx-react";
import {CreateTripPageStore} from "./create-trip.page.store";
import styles from "./create-trip-page.module.scss";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {CheckBox} from "../../components/inputs/check-box/check-box";
import {Amenities, TripRecommendationType} from "@/src/api/openapi";
import {cn, formatTimeForTrip, hoursToSeconds, removeOnIndex} from "@/src/utils/common";
import {TripRouteCreate} from "../../compositions/trip/trip-route/trip-route-create/trip-route-create";
import {DatePicker} from "../../components/inputs/date-picker/date-picker";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {DirectionsMap} from "../../components/directions-map/directions-map";
import {
    TripRouteRecommendation
} from "../../compositions/trip/trip-route/trip-route-recommendation/trip-route-recommendation";
import {GeoPoint} from "@/src/data/geoPoint";
import {NumberBox} from "../../components/inputs/number-box/number-box";
import {ROUTES} from "@/src/enums/router.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {useInit, useMount, useUnmount} from "@/src/hooks/lifecycleHooks";
import {useApp} from "@/src/app/contexts/AppContext";
import { useRouter } from "@/src/i18n/navigation";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";

const CreateTripPage = observer(() => {
    const router = useRouter();
    const {showLoader, hideLoader} = useApp();
    const _store = useInit(() => new CreateTripPageStore());
    const locale = useCurrentLocale();
    const _configuration = AppConfiguration.instance;
    const {t} = useTranslate("component.trip");
    const cfg = _configuration.appBusinessConfig;

    useMount(() => {
        _store.init();
    })

    useUnmount(() => {
        _store.destroy();
    })

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24} style={{padding: "20px"}}>
        <LayoutFlexRow justifyContent={"space-between"} alignItems={"center"}>
            <span>Kolik handikepovaných: </span>
            <NumberBox
                controlled={true}
                value={_store.trip.handicappedUserCount}
                onChange={(val) => {
                    if (val) {
                        _store.trip.handicappedUserCount = val;
                    }
                }}
                minValue={0}
            />
        </LayoutFlexRow>
        <LayoutFlexRow justifyContent={"space-between"} alignItems={"center"}>
            <span>Kdy nabídka končí: </span>
            <DatePicker
                value={_store.trip.endOrder}
                onChange={(val) => {
                    if (val) {
                        _store.trip.endOrder = val;
                    }
                }}
                placeholderText={"End"}
                showTimeSelect={true}
                locale={locale}
            />
        </LayoutFlexRow>
        <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            {!_store.endOrderIsValid && <p style={{color: "red"}}>Min EndOrder From Now is {cfg.minEndOrderFromNowInHours} in Hours</p>}
            {!_store.endOrderWithStartTripIsValid && <p style={{color: "red"}}>Min diff between EndOrder and StartTrip is {cfg.minDiffBetweenStartTripAndEndOrderInHours} in Hours</p>}
        </LayoutFlexColumn>
        <LayoutFlexRow justifyContent={"space-between"} alignItems={"center"}>
            <span>Pocet osob: </span>
            <NumberBox
                controlled={true}
                value={_store.trip.numberOfPersons}
                onChange={(val) => {
                    if (val) {
                        _store.trip.numberOfPersons = val;
                    }
                }}
                minValue={0}
            />
        </LayoutFlexRow>
        <LayoutFlexRow justifyContent={"space-between"} alignItems={"center"}>
            <span>Diety pro ridice: </span>
            <CheckBox
                value={_store.trip.dietForTransporter}
                onChange={(val) => _store.trip.dietForTransporter = val}
            />
        </LayoutFlexRow>
        <LayoutFlexRow canWrap={true} gap={FlexGap.SMALL_16}>
            {Object.values(Amenities).map((amenity, index) => {
                return <CheckBox
                    key={index}
                    label={amenity}
                    value={_store.trip.amenities.indexOf(amenity) > -1}
                    onChange={(val) => {
                        if (val) {
                            _store.trip.amenities.push(amenity);
                        } else {
                            const index = _store.trip.amenities.indexOf(amenity);
                            removeOnIndex(_store.trip.amenities, index);
                        }
                    }}
                />
            })}
        </LayoutFlexRow>
        <LayoutFlexRow>
            <LayoutFlexColumn gap={FlexGap.MEDIUM_24} style={{flex: 1}}>
                {_store.trip.routes.map((route, index) => {
                    return <LayoutFlexColumn key={index} gap={FlexGap.SMALL_16}>
                        <TripRouteCreate
                            route={route}
                            trip={_store.trip}
                        />
                        <ButtonClick
                            controlled={true}
                            size={ButtonSize.BY_CONTENT}
                            label={"Smazat"}
                            type={ButtonType.YELLOW}
                            onClick={() => {
                                removeOnIndex(_store.trip.routes, index);
                            }}
                        />
                    </LayoutFlexColumn>
                })}
                <ButtonClick
                    controlled={true}
                    size={ButtonSize.BY_CONTENT}
                    label={"Přidat zastavku"}
                    type={ButtonType.YELLOW}
                    onClick={() => {
                        _store.trip.addRoute();
                    }}
                />
            </LayoutFlexColumn>
            {_store.displayRecommendation && <LayoutFlexColumn gap={FlexGap.MEDIUM_24} style={{flex: 1, border: "2px solid #16C15B"}}>
                <p><b>ECONOMY</b> version for one driver</p>
                {_store.tripRecommendation === TripRecommendationType.ONE_DRIVER && <>{_store.trip.routes.map((route, index) => {
                    return <LayoutFlexColumn key={index} gap={FlexGap.SMALL_16}>
                        <TripRouteRecommendation
                            route={route}
                            trip={_store.trip}
                        />
                        <div>
                            <p>DJ: {formatTimeForTrip(hoursToSeconds(route.currentDJ), t("directionHours"), t("directionMinutes"))}</p>
                            <p>M: {formatTimeForTrip(hoursToSeconds(route.currentM), t("directionHours"), t("directionMinutes"))}</p>
                            <p>REAL: {formatTimeForTrip(route.computedDirectionInSeconds, t("directionHours"), t("directionMinutes"))}</p>
                        </div>
                    </LayoutFlexColumn>
                })}</>}
                {_store.tripRecommendation === TripRecommendationType.TWO_DRIVERS && <div>
                    <p>REDUCE ROUTE: {_store.reduceRoutesHours} Hours</p>
                    <p>REDUCE TIME: {_store.reduceTimeHours} Hours</p>
                </div>}
            </LayoutFlexColumn>}
        </LayoutFlexRow>
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <ButtonClick
                controlled={true}
                size={ButtonSize.BY_CONTENT}
                label={"Vytvořit nabídku"}
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
});;

export default CreateTripPage;