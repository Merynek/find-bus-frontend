import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {TripOfferService} from "@/src/services/TripOfferService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {URL_PARAMS} from "@/src/enums/router.enum";

interface ITripParams {
    [URL_PARAMS.TRIP_ID]: string;
}

async function PageWrapper(props: PageProps<ITripParams>) {
    const params = await props.params;
    try {
        const tripId = parseInt(params[URL_PARAMS.TRIP_ID]);
        const trip = await TripService.getTrip(tripId);
        const offerMovements = await TripOfferService.getOfferStateMovements(tripId);
        const offers = await TripOfferService.getTripOffers(tripId);

        return <AdminTripDetailPage
            trip={trip}
            offerMovements={offerMovements}
            offers={offers}
            locale={params.locale}
        />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;