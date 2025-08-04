import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {TripOfferService} from "@/src/services/TripOfferService";
import {PageProps} from "@/types/page.types";

interface ITripParams {
    tripId: string;
}

async function PageWrapper(props: PageProps<ITripParams>) {
    const params = await props.params;
    const tripId = parseInt(params.tripId);
    const trip = await TripService.getTrip(tripId, params.locale);
    const offerMovements = await TripOfferService.getOfferStateMovements(tripId, params.locale);
    const offers = await TripOfferService.getTripOffers(tripId, params.locale);

    return <AdminTripDetailPage
        trip={trip}
        offerMovements={offerMovements}
        offers={offers}
    />;
}

export default PageWrapper;