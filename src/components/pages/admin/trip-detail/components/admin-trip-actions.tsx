import {Trip} from "@/src/data/trip/trip";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {AdminTripCloseActions} from "@/src/components/pages/admin/trip-detail/components/admin-trip-close-actions";
import {AdminTripMoveActions} from "@/src/components/pages/admin/trip-detail/components/admin-trip-move-actions";
import {Offer} from "@/src/data/offer";
import {FlexGap} from "@/src/enums/layout.enum";

interface IAdminTripActionsProps {
    trip: Trip;
    offers: Offer[];
}

export const AdminTripActions = (props: IAdminTripActionsProps) => {
    const {trip, offers} = props;

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
        <AdminTripMoveActions
            trip={trip.toJson()}
            offers={offers.map(o => o.toJson())}
        />
        <AdminTripCloseActions
            trip={trip.toJson()}
        />
    </LayoutFlexColumn>
};
