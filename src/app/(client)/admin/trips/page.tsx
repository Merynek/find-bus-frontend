import AdminTripsPage from "@/src/components/pages/admin/trips/admin-trips.page";
import {TripService} from "@/src/services/TripService";

async function PageWrapper() {
    const trips = await TripService.getTrips(1, 5);
    return <AdminTripsPage/>;
}

export default PageWrapper;