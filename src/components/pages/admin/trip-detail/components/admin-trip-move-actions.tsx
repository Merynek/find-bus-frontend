"use client";

import {observer} from "mobx-react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import {useBean} from "ironbean-react";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {Offer} from "@/src/data/offer";
import {TripOfferResponseDto, TripOfferState, TripResponseDto} from "@/src/api/openapi";
import { useRouter } from 'next/navigation';
import {AppManager} from "@/src/singletons/app-manager";
import {TripOfferConverter} from "@/src/converters/trip-offer-converter";
import {TripConverter} from "@/src/converters/trip/trip-converter";

interface IAdminTripMoveActionsProps {
    trip: TripResponseDto;
    offers: TripOfferResponseDto[];
}

export const AdminTripMoveActions = observer((props: IAdminTripMoveActionsProps) => {
    const offers = props.offers.map(o => TripOfferConverter.toClient(o));
    const trip = TripConverter.toClient(props.trip);
    const tripsOfferApi = useBean(TripsOfferApi);
    const appManager = useBean(AppManager);
    const router = useRouter();

    const getOfferToPay = (): Offer|null => {
        const acceptedOffer = offers.find(offer => offer.accepted);
        if (acceptedOffer) {
            switch (trip.offerState) {
                case TripOfferState.ACCEPTED_TRANSPORTER_PAY_DEPOSIT:
                case TripOfferState.ACCEPTED_TRANSPORTER_PAY_FULL:
                case TripOfferState.PAYED_DEPOSIT:
                    return acceptedOffer;
            }
        }
        return null;
    }

    const canStartTrip = (): boolean => {
        switch (trip.offerState) {
            case TripOfferState.PAYED_FULL:
                return true;
        }
        return false;
    }

    const canFinishTrip = (): boolean => {
        switch (trip.offerState) {
            case TripOfferState.STARTED:
                return true;
        }
        return false;
    }

    const renderPayButton = (offer: Offer) => {
        return <ButtonClick
            onClick={async () => {
                appManager.loading = true;
                await tripsOfferApi.payedOffer({
                    offerId: offer.id
                })
                appManager.loading = false;
                router.refresh();
            }}
            label={"Payed Offer"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const renderStartButton = () => {
        return <ButtonClick
            onClick={async () => {
                appManager.loading = true;
                await tripsOfferApi.startTrip({
                    tripId: trip.id
                })
                appManager.loading = false;
                router.refresh();
            }}
            label={"Start Trip"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const renderFinishButton = () => {
        return <ButtonClick
            onClick={async () => {
                appManager.loading = true;
                await tripsOfferApi.finishTrip({
                    tripId: trip.id
                })
                appManager.loading = false;
                router.refresh();
            }}
            label={"Finish Trip"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const offerToPay = getOfferToPay();

    return <LayoutFlexColumn>
        {offerToPay && renderPayButton(offerToPay)}
        {canStartTrip() && renderStartButton()}
        {canFinishTrip() && renderFinishButton()}
    </LayoutFlexColumn>
})