import TripDetailPage from "@/src/components/pages/trip-detail/trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {PageProps} from "@/types/page.types";

interface IParams {
    tripId: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const trip = await TripService.getTrip(Number(props.params.tripId), props.params.locale);
    return <TripDetailPage trip={trip} />;
}

export default PageWrapper;