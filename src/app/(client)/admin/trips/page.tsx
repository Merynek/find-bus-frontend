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
    const trips = await TripService.getTrips({
        offset: searchParams.offset ? Number(searchParams.offset) : 0,
        limit: searchParams.limit ? Number(searchParams.limit) : 200
    });
    return <AdminTripsPage trips={trips} />
}

export default PageWrapper;