import {Trip} from "@/src/data/trip/trip";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {AdminTripCloseActions} from "@/src/components/pages/admin/trip-detail/components/admin-trip-close-actions";
import {AdminTripMoveActions} from "@/src/components/pages/admin/trip-detail/components/admin-trip-move-actions";
import {Offer} from "@/src/data/offer";
import {FlexGap} from "@/src/enums/layout.enum";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {TripOfferConverter} from "@/src/converters/trip-offer-converter";

interface IAdminTripActionsProps {
    trip: Trip;
    offers: Offer[];
}

export const AdminTripActions = (props: IAdminTripActionsProps) => {
    const {trip, offers} = props;

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
        <AdminTripMoveActions
            trip={TripConverter.toJson(trip)}
            offers={offers.map(o => TripOfferConverter.toJson(o))}
        />
        <AdminTripCloseActions
            trip={TripConverter.toJson(trip)}
        />
    </LayoutFlexColumn>
};
