import React from "react";
import {useTranslate} from "@/src/hooks/translateHook";
import styles from "./trip-route-create.module.scss";
import {observer} from "mobx-react";
import {DatePicker} from "../../../../components/inputs/date-picker/date-picker";
import {Configuration} from "@/src/singletons/configuration";
import {Route} from "@/src/data/trip/route";
import {Trip} from "@/src/data/trip/trip";
import {TripStop} from "../../trip-stop/trip-stop/trip-stop";
import {formatTimeForTrip, getFormattedDistance} from "@/src/utils/common";
import {formatDateTime} from "@/src/utils/date-time.format";
import {ValidationState} from "../../../../components/inputs/inputEnum";
import {ValidationTooltip} from "../../../../components/validation-tooltip/validation-tooltip";
import {useBean} from "ironbean-react";

export interface ITripRouteCreateProps {
    trip: Trip;
    route: Route;
}

export const TripRouteCreate = observer((props: ITripRouteCreateProps) => {
    const {route, trip} = props;
    const _locKey = "component.trip.";
    const {t} = useTranslate();
    const _configuration = useBean(Configuration);

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
                <ValidationTooltip
                    placement={'right'}
                    state={ValidationState.ERROR}
                    open={!route.dateTimeIsValid}
                    message={"Wrong date"}
                >
                    <DatePicker
                        selected={route.start}
                        minDate={route.minDate}
                        onChange={(val) => {
                            if (val) {
                                route.start = val;
                            }
                        }}
                        placeholderText={t(_locKey + "timeFromPlaceHolder")}
                        showTimeSelect={true}
                    />
                </ValidationTooltip>
            </div>
        </div>
        <div className={styles.section}>
            <span className={styles.label}>Vzdálenost / Čas (mapbox):</span>
            <span>{getFormattedDistance(route.direction.distance)}
                / {formatTimeForTrip(route.direction.timeInSeconds, t("component.trip.directionHours"), t("component.trip.directionMinutes"))}</span>
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
                date: route.endTime,
                locale: _configuration.locale
            })}</span>
        </div>
    </div>
});