import AdminTripsPage from "@/src/components/pages/admin/trips/admin-trips.page";
import {TripService} from "@/src/services/TripService";

interface IAdminTripsPageProps {
    searchParams: {
        offset?: string;
        limit?: string;
    };
}

async function PageWrapper(props: IAdminTripsPageProps) {
    const {searchParams} = props;
    const {offset, limit} = await searchParams;
    const trips = await TripService.getTrips({
        offset: offset ? Number(offset) : 0,
        limit: limit ? Number(limit) : 200
    });
    return <AdminTripsPage trips={trips} />
}

export default PageWrapper;