import React from "react";
import styles from "./trip-route-recommendation.module.scss";
import {observer} from "mobx-react";
import {DatePicker} from "../../../../components/inputs/date-picker/date-picker";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {Route} from "@/src/data/trip/route";
import {Trip} from "@/src/data/trip/trip";
import {TripStop} from "../../trip-stop/trip-stop/trip-stop";
import {formatTimeForTrip, getFormattedDistance} from "@/src/utils/common";
import {formatDateTime} from "@/src/utils/date-time.format";
import {useBean} from "ironbean-react";
import {useTranslate} from "@/src/hooks/translateHook";

export interface ITripRouteRecommendationProps {
    trip: Trip;
    route: Route;
}

export const TripRouteRecommendation = observer((props: ITripRouteRecommendationProps) => {
    const {route, trip} = props;
    const _locKey = "component.trip.";
    const {t} = useTranslate();
    const _configuration = useBean(AppConfiguration);

    return <div className={styles.layout}>
        <div className={styles.section}>
            <span className={styles.label}>{t(_locKey + "stopFromLabel")}: </span>
            <TripStop
                trip={trip}
                stop={route.from}
            />
        </div>
        <div className={styles.section}>
            <span className={styles.label}>{t(_locKey + "timeFromLabel")}:</span>
            <div className={styles.date}>
                <DatePicker
                    selected={route.computedDate}
                    disabled={true}
                    minDate={route.minDate}
                    onChange={(val) => {
                        if (val) {
                            route.start = val;
                        }
                    }}
                    placeholderText={t(_locKey + "timeFromPlaceHolder")}
                    showTimeSelect={true}
                />
            </div>
        </div>
        <div className={styles.section}>
            <span className={styles.label}>Vzdálenost / Čas (mapbox):</span>
            <span>{getFormattedDistance(route.direction.distance)}
                / {formatTimeForTrip(route.computedDirectionInSeconds, t("component.trip.directionHours"), t("component.trip.directionMinutes"))}</span>
        </div>
        <div className={styles.section}>
            <span className={styles.label}>{t(_locKey + "stopToLabel")}: </span>
            <TripStop
                trip={trip}
                stop={route.to}
            />
        </div>
        <div className={styles.section}>
            <span className={styles.label}>{t(_locKey + "computedTimeToLabel")}: </span>
            <span className={styles.date}>{formatDateTime({
                locale: _configuration.locale,
                date: route.computedEndTime
            })}
            </span>
        </div>
    </div>
});