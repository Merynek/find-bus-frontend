import {TripOfferState} from "@/src/api/openapi";
import React from "react";
import styles from "./trip-states-flow.module.scss";
import {TripState} from "@/src/components/compositions/trip/trip-state/trip-state";
import {Trip} from "@/src/data/trip/trip";

interface ITripStateProps {
    trip: Trip;
}

export const TripStatesFlow = (props: ITripStateProps) => {
    const {trip} = props;
    const states = [
        TripOfferState.CREATED,
        TripOfferState.HAS_OFFERS,
        TripOfferState.ACCEPTED_TRANSPORTER_PAY_DEPOSIT,
        TripOfferState.ACCEPTED_TRANSPORTER_PAY_FULL,
        TripOfferState.PAYED_DEPOSIT,
        TripOfferState.PAYED_FULL,
        TripOfferState.STARTED,
        TripOfferState.FINISHED,
        TripOfferState.CLOSED
    ];

    const getStateIndex = (state: TripOfferState): number => {
        return states.indexOf(state);
    };

    const getStatesProps = (state: TripOfferState): {isActive: boolean; isCompleted: boolean} => {
        const currentTripStateIndex = getStateIndex(trip.offerState);
        const currentStateIndex = getStateIndex(state);
        const lastStateIndex = states.length - 1;

        const isActive = currentTripStateIndex === currentStateIndex;

        const isCompleted = currentStateIndex < currentTripStateIndex ||
            (isActive && currentStateIndex === lastStateIndex);

        return {isActive, isCompleted};
    };

    return <div className={styles.layout}>
        <div className={styles.line}/>
        <div className={styles.states}>
            {states.map(state => {
                const { isActive, isCompleted } = getStatesProps(state);
                return <TripState
                    key={state}
                    state={state}
                    isActive={isActive}
                    isCompleted={isCompleted}
                />
            })}
        </div>
    </div>
};