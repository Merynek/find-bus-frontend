import TripDetailPage from "@/src/components/pages/trip-detail/trip-detail.page";
import {TripService} from "@/src/services/TripService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {AdminService} from "@/src/services/AdminService";
import {URL_PARAMS} from "@/src/enums/router.enum";

interface IParams {
    [URL_PARAMS.TRIP_ID]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    let trip;
    let config;

    try {
        trip = await TripService.getTrip(Number(params[URL_PARAMS.TRIP_ID]));
        config = await AdminService.getAppBusinessConfig();
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }

    return <TripDetailPage trip={trip} config={config} />;
}

export default PageWrapper;