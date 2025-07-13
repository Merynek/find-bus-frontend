"use client";

import React from 'react';
import {observer} from "mobx-react";
import {useInit, useMount} from "@/src/hooks/lifecycleHooks";
import {AdminTripDetailPageStore} from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page.store";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripStatesFlow} from "@/src/components/compositions/trip/trip-states-flow/trip-states-flow";
import {LoaderArea} from "@/src/components/components/loader-area/loader-area";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FontSize, FontWeight, Text} from "@/src/components/components/texts/text/text";
import {DateTimeFormat} from "@/src/enums/date-time-format.enum";
import {Trip} from "@/src/data/trip/trip";
import {DateTimeManager} from "@/src/singletons/date-time-manager";
import styles from "./admin-trip-detail.page.module.scss";
import {useBean} from "ironbean-react";
import {cn} from "@/src/utils/common";
import {AdminTripActions} from "@/src/components/pages/admin/trip-detail/components/admin-trip-actions";
import {AdminTripMovements} from "@/src/components/pages/admin/trip-detail/components/admin-trip-movements";
import {TripOfferMovement} from "@/src/data/tripOfferMovement";
import {Offer} from "@/src/data/offer";

interface TripDetailPageProps {
    params: {
        tripId: string;
    };
}

const AdminTripDetailPage = observer((props: TripDetailPageProps) => {
    const dateTimeManager = useBean(DateTimeManager);
    const store = useInit(() => {
        return new AdminTripDetailPageStore({})
    });

    useMount(() => {
        loadDetail();
    })

    const loadDetail = async () => {
        if (props.params.tripId) {
            await store.getTrip(parseInt(props.params.tripId));
            await store.loadMovements();
            await store.loadOffers();
        }
    }

    const renderInfo = (trip: Trip) => {
        return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <TripStatesFlow trip={trip} />
            <LayoutFlexRow gap={FlexGap.TINY_8} alignItems={"center"}>
                <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                    <Text text={"ID: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                    <Text text={trip.id.toString()} fontSize={FontSize.BASE_14} />
                </LayoutFlexRow>
                <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                    <Text text={"Passengers: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                    <Text text={trip.numberOfPersons.toString()} fontSize={FontSize.BASE_14} />
                </LayoutFlexRow>
                <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                    <Text text={"From: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                    <Text text={trip.routes[0].from.place.name?.toString() || ""} fontSize={FontSize.BASE_14} />
                </LayoutFlexRow>
                <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                    <Text text={"To: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                    <Text text={trip.routes[trip.routes.length - 1].to.place.name?.toString() || ""} fontSize={FontSize.BASE_14} />
                </LayoutFlexRow>
                <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                    <Text text={"Distance: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                    <Text text={trip.totalDistanceInMeters.toString()} fontSize={FontSize.BASE_14} />
                </LayoutFlexRow>
                <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                    <Text text={"End offer: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                    <Text text={dateTimeManager.dateTimeFormat(DateTimeFormat.FORMAT_DMY, trip.endOrder)} fontSize={FontSize.BASE_14} />
                </LayoutFlexRow>
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    const renderAllOffers = (offers: Offer[]) => {
        return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            <Text text={"Offers: "} fontSize={FontSize.M_22} />
            {offers.map(offer => {
                return <div className={cn(offer.accepted && styles.acceptedOffer)} key={offer.id}>
                    <LayoutFlexColumn gap={FlexGap.TINY_8}>
                        <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                            <Text text={"Id: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                            <Text text={offer.id.toString()} fontSize={FontSize.BASE_14} />
                        </LayoutFlexRow>
                        <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                            <Text text={"Price: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                            <Text text={offer.price.amount.toString()} fontSize={FontSize.BASE_14} />
                        </LayoutFlexRow>
                    </LayoutFlexColumn>
                </div>
            })}
        </LayoutFlexColumn>
    }

    const renderMovements = (movements: TripOfferMovement[]) => {
        return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            <Text text={"Movements: "} fontSize={FontSize.M_22} />
            <AdminTripMovements movements={movements} />
        </LayoutFlexColumn>
    }

    const renderActions = () => {
        return store.trip ? <AdminTripActions
            trip={store.trip}
            offers={store.offers}
        /> : null;
    }

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
        {store.trip ? renderInfo(store.trip) : <LoaderArea />}
        {store.movements.length !== 0 && renderMovements(store.movements)}
        {store.offers.length !== 0 && renderAllOffers(store.offers)}
        {renderActions()}
    </LayoutFlexColumn>
});

export default AdminTripDetailPage;