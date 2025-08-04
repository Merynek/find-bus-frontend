import AdminTripsPage from "@/src/components/pages/admin/trips/admin-trips.page";
import {TripService} from "@/src/services/TripService";
import {PageProps} from "@/types/page.types";

interface ISearchParams {
    offset?: string;
    limit?: string;
}

async function PageWrapper(props: PageProps<Record<string, never>, ISearchParams>) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const trips = await TripService.getTrips({
        offset: searchParams?.offset ? Number(searchParams?.offset) : 0,
        limit: searchParams?.limit ? Number(searchParams?.limit) : 200
    }, params.locale);
    return <AdminTripsPage trips={trips} />
}

export default PageWrapper;