import TripDetailPage from "@/src/components/pages/trip-detail/trip-detail.page";
import {TripService} from "@/src/services/TripService";

interface TripDetailPageProps {
    params: {
        tripId: string;
    };
}

async function PageWrapper(props: TripDetailPageProps) {
    const trip = await TripService.getTrip(Number(props.params.tripId));
    return <TripDetailPage trip={trip} />;
}

export default PageWrapper;