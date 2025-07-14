"use client";

import {observer} from "mobx-react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React, {useState} from "react";
import {CloseTripOfferReason, TripOfferState, TripResponseDto} from "@/src/api/openapi";
import {AdminTripCloseReasons} from "@/src/components/pages/admin/trip-detail/components/admin-trip-close-reasons";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import {useBean} from "ironbean-react";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import { useRouter } from 'next/navigation';
import {AppManager} from "@/src/singletons/app-manager";
import {TripConverter} from "@/src/converters/trip/trip-converter";

interface IAdminTripActionsProps {
    trip: TripResponseDto;
}

export const AdminTripCloseActions = observer((props: IAdminTripActionsProps) => {
    const trip = TripConverter.toClient(props.trip);
    const tripsOfferApi = useBean(TripsOfferApi);
    const appManager = useBean(AppManager);
    const [reason, setReason] = useState<CloseTripOfferReason>(CloseTripOfferReason.GENERAL);
    const router = useRouter();

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
                router.refresh();
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