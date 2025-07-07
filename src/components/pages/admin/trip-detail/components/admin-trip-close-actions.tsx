import {observer} from "mobx-react";
import {Trip} from "@/src/data/trip/trip";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React, {useState} from "react";
import {CloseTripOfferReason, TripOfferState} from "@/src/api/openapi";
import {AdminTripCloseReasons} from "@/src/components/pages/admin/trip-detail/components/admin-trip-close-reasons";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import {useBean} from "ironbean-react";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {useNavigate} from "react-router-dom";
import {AppManager} from "@/src/singletons/app-manager";

interface IAdminTripActionsProps {
    trip: Trip;
}

export const AdminTripCloseActions = observer((props: IAdminTripActionsProps) => {
    const {trip} = props;
    const tripsOfferApi = useBean(TripsOfferApi);
    const appManager = useBean(AppManager);
    const [reason, setReason] = useState<CloseTripOfferReason>(CloseTripOfferReason.GENERAL);
    const navigate = useNavigate();

    const renderCloseButton = () => {
        switch (trip.offerState) {
            case TripOfferState.CLOSED:
                return null;
        }
        return <ButtonClick
            onClick={async () => {
                appManager.loading = true;
                await tripsOfferApi.forceCloseTrip({
                    tripId: trip.id,
                    reason: reason,
                    reasonText: ""
                })
                appManager.loading = false;
                navigate(0);
            }}
            label={"Force Close"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const renderCloseReason = () => {
        switch (trip.offerState) {
            case TripOfferState.ACCEPTED_TRANSPORTER_PAY_DEPOSIT:
            case TripOfferState.ACCEPTED_TRANSPORTER_PAY_FULL:
            case TripOfferState.PAYED_DEPOSIT:
            case TripOfferState.PAYED_FULL:
                return <AdminTripCloseReasons
                    trip={trip}
                    reason={reason}
                    onChange={setReason}
                />
        }
        return null;
    }

    return <LayoutFlexColumn>
        {renderCloseButton()}
        {renderCloseReason()}
    </LayoutFlexColumn>
})