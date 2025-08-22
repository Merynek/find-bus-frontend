import AdminTripsPage from "@/src/components/pages/admin/trips/admin-trips.page";
import {TripService} from "@/src/services/TripService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

interface ISearchParams {
    offset?: string;
    limit?: string;
}

async function PageWrapper(props: PageProps<Record<string, never>, ISearchParams>) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    try {
        const trips = await TripService.getTrips({
            offset: searchParams?.offset ? Number(searchParams?.offset) : 0,
            limit: searchParams?.limit ? Number(searchParams?.limit) : 200
        });
        return <AdminTripsPage trips={trips} />
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;