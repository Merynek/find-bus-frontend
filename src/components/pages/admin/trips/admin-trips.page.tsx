import React from "react";
import styles from "./admin-trips.page.module.scss";
import {observer} from "mobx-react";
import {AdminTripsPageStore} from "./admin-trips.page.store";
import {TripListItemAdmin} from "../../../compositions/trip/trip-list-item-admin/trip-list-item-admin";
import {useInit, useMount} from "@/src/hooks/lifecycleHooks";
import {TripItem} from "@/src/data/tripItem";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";

export interface IAdminTripsPageProps {
}

const AdminTripsPage = observer((props: IAdminTripsPageProps) => {
    const _locKey = "page.tripsStateOffer.";
    const store = useInit(() => {
        return new AdminTripsPageStore({})
    });

    useMount(() => {
        store.loadData();
    })

    const _renderItem = (trip: TripItem) => {
        return <TripListItemAdmin
            tripItem={trip}
            key={trip.id}
        />
    }

    return <div className={styles.layout}>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            {store.trips.map(trip => _renderItem(trip))}
        </LayoutFlexColumn>
    </div>
});

export default AdminTripsPage;