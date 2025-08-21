import React from 'react';
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripStatesFlow} from "@/src/components/compositions/trip/trip-states-flow/trip-states-flow";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Text} from "@/src/components/components/texts/text";
import {DateTimeFormat} from "@/src/enums/date-time-format.enum";
import {Trip} from "@/src/data/trip/trip";
import {DateTimeManager} from "@/src/singletons/date-time-manager";
import styles from "./admin-trip-detail.page.module.scss";
import {cn} from "@/src/utils/common";
import {AdminTripActions} from "@/src/components/pages/admin/trip-detail/components/admin-trip-actions";
import {AdminTripMovements} from "@/src/components/pages/admin/trip-detail/components/admin-trip-movements";
import {TripOfferMovement} from "@/src/data/tripOfferMovement";
import {Offer} from "@/src/data/offer";
import {LOCALES} from "@/src/utils/locale";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";

interface TripDetailPageProps {
    trip: Trip;
    offers: Offer[];
    offerMovements: TripOfferMovement[];
    locale: LOCALES;
}

const AdminTripDetailPage = (props: TripDetailPageProps) => {
    const {trip, offerMovements, offers, locale} = props;

    const renderInfo = () => {
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
                    <Text text={DateTimeManager.dateTimeFormat(DateTimeFormat.FORMAT_DMY, trip.endOrder)} fontSize={FontSize.BASE_14} />
                </LayoutFlexRow>
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    const renderAllOffers = () => {
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

    const renderMovements = () => {
        return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            <Text text={"Movements: "} fontSize={FontSize.M_22} />
            <AdminTripMovements movements={offerMovements} locale={locale} />
        </LayoutFlexColumn>
    }

    const renderActions = () => {
        return <AdminTripActions
            trip={trip}
            offers={offers}
        />
    }

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
        {renderInfo()}
        {offerMovements.length !== 0 && renderMovements()}
        {offers.length !== 0 && renderAllOffers()}
        {renderActions()}
    </LayoutFlexColumn>
};

export default AdminTripDetailPage;