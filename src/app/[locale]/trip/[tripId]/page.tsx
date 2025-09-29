import TripDetailPage from "@/src/components/pages/trip-detail/trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {AdminService} from "@/src/services/AdminService";

interface IParams {
    tripId: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    try {
        const trip = await TripService.getTrip(Number(params.tripId));
        const config = await AdminService.getAppBusinessConfig();

        return <TripDetailPage trip={trip} config={config} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;