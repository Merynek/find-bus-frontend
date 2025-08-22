"use client";

import {observer} from "mobx-react";
import React, {useState} from "react";
import {CloseTripOfferReason, TripOfferState, TripResponseDto, UserRole} from "@/src/api/openapi";
import {TripOfferResult} from "../trip-offer-result/trip-offer-result";
import {TripCreateOffer} from "../trip-create-offer/trip-create-offer";
import {TripOffer} from "../trip-offer/trip-offer";
import {TripOfferAccept} from "../trip-offer-accept/trip-offer-accept";
import {useInit, useMount} from "@/src/hooks/lifecycleHooks";
import {Offer} from "@/src/data/offer";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import { useRouter } from '@/src/i18n/navigation';
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {TripOfferService} from "@/src/services/TripOfferService";
import {useApp} from "@/src/app/contexts/AppContext";
import {useLoggedUser} from "@/src/hooks/authenticationHook";

export interface ITripOfferSectionProps {
    trip: TripResponseDto;
}

export const TripOfferSection = observer((props: ITripOfferSectionProps) => {
    const trip = useInit(() => TripConverter.toInstance(props.trip));
    const {user} = useLoggedUser();
    const {showLoader, hideLoader} = useApp();
    const [offers, setOffers] = useState<Offer[]>([]);
    const router = useRouter();

    const loadOffers = async () => {
        showLoader();
        const _offers = await TripOfferService.getTripOffers(trip.id);
        setOffers(_offers);
        hideLoader();
    }

    const offerAccepted = () => {
        return offers.some(o => o.accepted);
    }

    useMount(() => {
        loadOffers();
    })

    const _actionsForTransporter = () => {
        return trip && <div>
            {trip.offerHasEnded ? <TripOfferResult trip={trip} offers={offers} />: <div>
                <h2>Make offer: </h2>
                <TripCreateOffer
                    trip={trip}
                    offers={offers}
                    onMakeOffer={async () => {
                        await loadOffers();
                    }}
                />
            </div>}
        </div>
    }

    const _renderCloseButton = () => {
        switch (trip.offerState) {
            case TripOfferState.CLOSED:
            case TripOfferState.FINISHED:
            case TripOfferState.STARTED:
                return null;
        }
        if (user?.role === UserRole.TRANSPORTER) {
            if (offers.length) {
                return _transporterCloseButton();
            }
        }
        if (user?.role === UserRole.DEMANDER) {
            return _demanderCloseButton();
        }
        return null;
    }

    const _transporterCloseButton = () => {
        return <ButtonClick
            controlled={true}
            onClick={async () => {
                showLoader();
                await TripOfferService.deleteOffer(trip.id);
                hideLoader();
            }}
            label={"Zrušit nabídku"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const _demanderCloseButton = () => {
        return <ButtonClick
            controlled={true}
            onClick={async () => {
                showLoader();
                await TripOfferService.forceCloseTrip(trip.id, CloseTripOfferReason.DEMANDER_GENERAL, "");
                hideLoader();
                router.refresh();
            }}
            label={"Ukončit trip"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const isOwner = () => {
        return user?.id === trip.ownerId;
    }

    const _actionsForDemander = () => {
        if (trip && isOwner()) {
            if (offerAccepted()) {
                return <TripOfferResult trip={trip} offers={offers} />;
            } else {
                if (trip.offerState === TripOfferState.CLOSED) {
                    return undefined;
                }
                return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                    <LayoutFlexColumn>
                        {offers.map(offer => {
                            return <div key={offer.id}>
                                <TripOffer offer={offer} />
                                <TripOfferAccept
                                    offer={offer}
                                    trip={trip}
                                    onAcceptOffer={async () => {
                                        await loadOffers();
                                    }}
                                />
                            </div>
                        })}
                    </LayoutFlexColumn>
                </LayoutFlexColumn>;
            }
        }
        return undefined;
    }

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
        {user?.role === UserRole.DEMANDER && _actionsForDemander()}
        {user?.role === UserRole.TRANSPORTER && _actionsForTransporter()}
        {_renderCloseButton()}
    </LayoutFlexColumn>
});