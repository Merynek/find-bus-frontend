"use client";

import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {Offer} from "@/src/data/offer";
import {TripOfferResponseDto, TripOfferState, TripResponseDto} from "@/src/api/openapi";
import {TripOfferConverter} from "@/src/converters/trip-offer-converter";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {useApp} from "@/src/app/contexts/AppContext";
import {TripOfferService} from "@/src/services/TripOfferService";
import {useInit} from "@/src/hooks/lifecycleHooks";
import {resetPage} from "@/src/utils/common";

interface IAdminTripMoveActionsProps {
    trip: TripResponseDto;
    offers: TripOfferResponseDto[];
}

export const AdminTripMoveActions = (props: IAdminTripMoveActionsProps) => {
    const offers = props.offers.map(o => TripOfferConverter.toInstance(o));
    const trip = useInit(() => TripConverter.toInstance(props.trip));
    const { showLoader, hideLoader } = useApp();


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
                showLoader();
                await TripOfferService.payedOffer(offer.id);
                hideLoader();
                resetPage();
            }}
            label={"Payed Offer"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const renderStartButton = () => {
        return <ButtonClick
            onClick={async () => {
                showLoader();
                await TripOfferService.startTrip(trip.id);
                hideLoader();
                resetPage();
            }}
            label={"Start Trip"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const renderFinishButton = () => {
        return <ButtonClick
            onClick={async () => {
                showLoader();
                await TripOfferService.finishTrip(trip.id);
                hideLoader();
                resetPage();
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
};