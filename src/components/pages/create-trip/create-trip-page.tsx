"use client";

import {useTranslate} from "@/src/hooks/translateHook";
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
import {useBean} from "ironbean-react";
import {CheckBoxSize} from "@/src/enums/check-box.enum";
import {NumberBox} from "../../components/inputs/number-box/number-box";
import {useRouter} from 'next/navigation';
import {ROUTES} from "@/src/enums/router.enum";
import {AppManager} from "@/src/singletons/app-manager";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {useInit} from "@/src/hooks/lifecycleHooks";

const CreateTripPage = observer(() => {
    const router = useRouter();
    const _store = useInit(() => new CreateTripPageStore());
    const _configuration = useBean(AppConfiguration);
    const _appManager = useBean(AppManager);
    const {t} = useTranslate();
    const cfg = _configuration.appBusinessConfig;

    return <div className={styles.layout}>
        <div className={styles.section}>
            <span>Kolik handikepovaných: </span>
            <NumberBox
                value={_store.trip.handicappedUserCount}
                onChange={(val) => {
                    if (val) {
                        _store.trip.handicappedUserCount = val;
                    }
                }}
                minValue={0}
            />
        </div>
        <div className={styles.section}>
            <span>Kdy nabídka končí: </span>
            <DatePicker
                selected={_store.trip.endOrder}
                onChange={(val) => {
                    if (val) {
                        _store.trip.endOrder = val;
                    }
                }}
                placeholderText={"End"}
                showTimeSelect={true}
            />
        </div>
        <div>
            {!_store.endOrderIsValid && <p style={{color: "red"}}>Min EndOrder From Now is {cfg.minEndOrderFromNowInHours} in Hours</p>}
            {!_store.endOrderWithStartTripIsValid && <p style={{color: "red"}}>Min diff between EndOrder and StartTrip is {cfg.minDiffBetweenStartTripAndEndOrderInHours} in Hours</p>}
        </div>
        <div className={styles.section}>
            <span>Pocet osob: </span>
            <NumberBox
                value={_store.trip.numberOfPersons}
                onChange={(val) => {
                    if (val) {
                        _store.trip.numberOfPersons = val;
                    }
                }}
                minValue={0}
            />
        </div>
        <div className={styles.section}>
            <span>Diety pro ridice: </span>
            <CheckBox
                value={_store.trip.dietForTransporter}
                onChange={(val) => _store.trip.dietForTransporter = val}
                size={CheckBoxSize.MEDIUM}
            />
        </div>
        <div>
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
                    size={CheckBoxSize.MEDIUM}
                />
            })}
        </div>
        <div className={styles.trips}>
            <div className={styles.stopsSection}>
                {_store.trip.routes.map((route, index) => {
                    return <div key={index}>
                        <TripRouteCreate
                            route={route}
                            trip={_store.trip}
                        />
                        <ButtonClick
                            size={ButtonSize.BY_CONTENT}
                            label={"Smazat"}
                            type={ButtonType.YELLOW}
                            onClick={() => {
                                removeOnIndex(_store.trip.routes, index);
                            }}
                        />
                    </div>
                })}
            </div>
            {_store.displayRecommendation && <div className={cn(styles.stopsSection, styles.recommendation)}>
                <p><b>ECONOMY</b> version for one driver</p>
                {_store.tripRecommendation === TripRecommendationType.ONE_DRIVER && <>{_store.trip.routes.map((route, index) => {
                    return <div key={index}>
                        <TripRouteRecommendation
                            route={route}
                            trip={_store.trip}
                        />
                        <div>
                            <p>DJ: {formatTimeForTrip(hoursToSeconds(route.currentDJ), t("component.trip.directionHours"), t("component.trip.directionMinutes"))}</p>
                            <p>M: {formatTimeForTrip(hoursToSeconds(route.currentM), t("component.trip.directionHours"), t("component.trip.directionMinutes"))}</p>
                            <p>REAL: {formatTimeForTrip(route.computedDirectionInSeconds, t("component.trip.directionHours"), t("component.trip.directionMinutes"))}</p>
                        </div>
                    </div>
                })}</>}
                {_store.tripRecommendation === TripRecommendationType.TWO_DRIVERS && <div>
                    <p>REDUCE ROUTE: {_store.reduceRoutesHours} Hours</p>
                    <p>REDUCE TIME: {_store.reduceTimeHours} Hours</p>
                </div>}
            </div>}
        </div>
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <ButtonClick
                size={ButtonSize.BY_CONTENT}
                label={"Přidat zastavku"}
                type={ButtonType.YELLOW}
                onClick={() => {
                    _store.trip.addRoute();
                }}
            />
            <ButtonClick
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
                            _appManager.loading = true;
                            await _store.createTrip();
                            _appManager.loading = false;
                            router.push(ROUTES.TRIP_LIST);
                        }
                        catch (e) {
                            console.log("error during create trip")
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
    </div>
});

export default CreateTripPage;