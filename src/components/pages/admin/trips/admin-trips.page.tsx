import React from "react";
import styles from "./admin-trips.page.module.scss";
import {TripListItemAdmin} from "../../../compositions/trip/trip-list-item-admin/trip-list-item-admin";
import {TripItem} from "@/src/data/tripItem";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";

interface IAdminTripsPageProps {
    trips: TripItem[];
}

const AdminTripsPage = (props: IAdminTripsPageProps) => {
    const {trips} = props;

    const _renderItem = (trip: TripItem) => {
        return <TripListItemAdmin
            tripItem={trip}
            key={trip.id}
        />
    }

    return <div className={styles.layout}>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            {trips.map(trip => _renderItem(trip))}
        </LayoutFlexColumn>
    </div>
};

export default AdminTripsPage;