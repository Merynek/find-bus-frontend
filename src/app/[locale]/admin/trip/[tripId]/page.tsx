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
    let tripId;
    let trip;
    let offerMovements;
    let offers;

    try {
        tripId = parseInt(params[URL_PARAMS.TRIP_ID]);
        trip = await TripService.getTrip(tripId);
        offerMovements = await TripOfferService.getOfferStateMovements(tripId);
        offers = await TripOfferService.getTripOffers(tripId);
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <AdminTripDetailPage
        trip={trip}
        offerMovements={offerMovements}
        offers={offers}
        locale={params.locale}
    />;
}

export default PageWrapper;