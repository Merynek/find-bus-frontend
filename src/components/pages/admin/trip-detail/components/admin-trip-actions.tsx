import {observer} from "mobx-react";
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

export const AdminTripActions = observer((props: IAdminTripActionsProps) => {
    const {trip, offers} = props;

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
        <AdminTripMoveActions
            trip={trip}
            offers={offers}
        />
        <AdminTripCloseActions
            trip={trip}
        />
    </LayoutFlexColumn>
});
