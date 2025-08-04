import TripDetailPage from "@/src/components/pages/trip-detail/trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {PageProps} from "@/types/page.types";

interface IParams {
    tripId: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    const trip = await TripService.getTrip(Number(params.tripId), params.locale);
    return <TripDetailPage trip={trip} />;
}

export default PageWrapper;