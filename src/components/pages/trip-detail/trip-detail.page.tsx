import React from "react";
import styles from "./trip-detail.page.module.scss";
import {TripDetail} from "../../compositions/trip/trip-detail/trip-detail";
import {TripOfferSection} from "../../compositions/trip/trip-offer-section/trip-offer-section";
import {Trip} from "@/src/data/trip/trip";
import {TripConverter} from "@/src/converters/trip/trip-converter";

interface TripDetailPageProps {
    trip: Trip;
}

const TripDetailPage = (props: TripDetailPageProps) => {
    const { trip } = props;

    return <div className={styles.layout}>
        <TripDetail trip={TripConverter.toJson(trip)} />
        <TripOfferSection trip={TripConverter.toJson(trip)} />
    </div>
};

export default TripDetailPage;