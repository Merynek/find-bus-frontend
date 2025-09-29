import React from "react";
import styles from "./trip-detail.page.module.scss";
import {TripDetail} from "../../compositions/trip/trip-detail/trip-detail";
import {TripOfferSection} from "../../compositions/trip/trip-offer-section/trip-offer-section";
import {Trip} from "@/src/data/trip/trip";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";

interface TripDetailPageProps {
    trip: Trip;
    config: AppBusinessConfig;
}

const TripDetailPage = (props: TripDetailPageProps) => {
    const { trip, config } = props;

    return <div className={styles.layout}>
        <TripDetail trip={TripConverter.toJson(trip)} />
        <TripOfferSection trip={TripConverter.toJson(trip)} config={AppBusinessConfigConverter.toJson(config)} />
    </div>
};

export default TripDetailPage;