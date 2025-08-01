import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {TripOfferService} from "@/src/services/TripOfferService";
import {PageProps} from "@/types/page.types";

interface ITripParams {
    tripId: string;
}

async function PageWrapper(props: PageProps<ITripParams>) {
    const locale = props.params.locale;
    const tripId = parseInt(props.params.tripId);
    const trip = await TripService.getTrip(tripId, locale);
    const offerMovements = await TripOfferService.getOfferStateMovements(tripId, locale);
    const offers = await TripOfferService.getTripOffers(tripId, locale);

    return <AdminTripDetailPage
        trip={trip}
        offerMovements={offerMovements}
        offers={offers}
    />;
}

export default PageWrapper;