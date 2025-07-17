import React from "react";
import styles from "./trip-detail.page.module.scss";
import {TripDetail} from "../../compositions/trip/trip-detail/trip-detail";
import {TripOfferSection} from "../../compositions/trip/trip-offer-section/trip-offer-section";
import {Trip} from "@/src/data/trip/trip";

interface TripDetailPageProps {
    trip: Trip;
}

const TripDetailPage = (props: TripDetailPageProps) => {
    const { trip } = props;

    return <div className={styles.layout}>
        <TripDetail trip={trip} />
        <TripOfferSection trip={trip.toJson()} />
    </div>
};

export default TripDetailPage;