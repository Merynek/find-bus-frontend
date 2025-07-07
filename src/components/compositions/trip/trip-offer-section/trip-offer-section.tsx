import {observer} from "mobx-react";
import React, {useState} from "react";
import {CloseTripOfferReason, TripOfferState, UserRole} from "@/src/api/openapi";
import {Trip} from "@/src/data/trip/trip";
import {useBean} from "ironbean-react";
import {CurrentUser} from "@/src/singletons/current-user";
import {TripOfferResult} from "../trip-offer-result/trip-offer-result";
import {TripCreateOffer} from "../trip-create-offer/trip-create-offer";
import {TripOffer} from "../trip-offer/trip-offer";
import {TripOfferAccept} from "../trip-offer-accept/trip-offer-accept";
import {AppManager} from "@/src/singletons/app-manager";
import {useMount} from "@/src/hooks/lifecycleHooks";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import {Offer} from "@/src/data/offer";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {useNavigate} from "react-router-dom";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";

export interface ITripOfferSectionProps {
    trip: Trip;
}

export const TripOfferSection = observer((props: ITripOfferSectionProps) => {
    const {trip} = props;
    const _currentUser = useBean(CurrentUser);
    const _appManager = useBean(AppManager);
    const _tripOfferApi = useBean(TripsOfferApi);
    const [offers, setOffers] = useState<Offer[]>([]);
    const _tripsOfferApi = useBean(TripsOfferApi);
    const navigate = useNavigate();

    const loadOffers = async () => {
        _appManager.loading = true;
        const _offers = await _tripOfferApi.getTripOffers({
            tripId: trip.id
        })
        setOffers(_offers);
        _appManager.loading = false;
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
        if (_currentUser.role === UserRole.TRANSPORTER) {
            if (offers.length) {
                return _transporterCloseButton();
            }
        }
        if (_currentUser.role === UserRole.DEMANDER) {
            return _demanderCloseButton();
        }
        return null;
    }

    const _transporterCloseButton = () => {
        return <ButtonClick
            onClick={async () => {
                _appManager.loading = true;
                await _tripsOfferApi.deleteOffer({
                    tripId: trip.id
                })
                _appManager.loading = false;
            }}
            label={"Zrušit nabídku"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const _demanderCloseButton = () => {
        return <ButtonClick
            onClick={async () => {
                _appManager.loading = true;
                await _tripsOfferApi.forceCloseTrip({
                    tripId: trip.id,
                    reason: CloseTripOfferReason.DEMANDER_GENERAL,
                    reasonText: ""
                })
                _appManager.loading = false;
                navigate(0);
            }}
            label={"Ukončit trip"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const _actionsForDemander = () => {
        if (trip && trip.isOwner) {
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
        {_currentUser.role === UserRole.DEMANDER && _actionsForDemander()}
        {_currentUser.role === UserRole.TRANSPORTER && _actionsForTransporter()}
        {_renderCloseButton()}
    </LayoutFlexColumn>
});