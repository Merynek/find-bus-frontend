import AdminTripsPage from "@/src/components/pages/admin/trips/admin-trips.page";
import {TripService} from "@/src/services/TripService";

interface IAdminTripsPageProps {
    searchParams: {
        offset?: string;
        limit?: string;
    };
}

async function PageWrapper(props: IAdminTripsPageProps) {
    const trips = await TripService.getTrips(0, 200);
    return <AdminTripsPage trips={trips} />
}

export default PageWrapper;