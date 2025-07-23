import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {TripOfferService} from "@/src/services/TripOfferService";

interface TripDetailPageProps {
    params: {
        tripId: string;
    };
}

async function PageWrapper(props: TripDetailPageProps) {
    const tripId = parseInt(props.params.tripId);
    const trip = await TripService.getTrip(tripId);
    const offerMovements = await TripOfferService.getOfferStateMovements(tripId);
    const offers = await TripOfferService.getTripOffers(tripId);

    return <AdminTripDetailPage
        trip={trip}
        offerMovements={offerMovements}
        offers={offers}
    />;
}

export default PageWrapper;