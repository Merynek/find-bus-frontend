import CreateTripPage from "@/src/components/pages/create-trip/create-trip-page";
import {AdminService} from "@/src/services/AdminService";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {URL_PARAMS} from "@/src/enums/router.enum";
import {PageProps} from "@/types/page.types";
import {TripResponseDto} from "@/src/api/openapi";
import {TripService} from "@/src/services/TripService";
import {TripConverter} from "@/src/converters/trip/trip-converter";

interface IParams {
    [URL_PARAMS.TRIP_ID]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    const tripParamArray = params[URL_PARAMS.TRIP_ID];
    const tripParam = tripParamArray && tripParamArray.length > 0 ? tripParamArray[0] : undefined;
    const tripId = tripParam ? Number(tripParam) : undefined;
    let trip: TripResponseDto|undefined = undefined;
    if (tripId) {
        const tripInstance = await TripService.getTripDraft(tripId);
        trip = TripConverter.toJson(tripInstance);
    }

    const config = await AdminService.getAppBusinessConfig();
    return <CreateTripPage
        cfg={AppBusinessConfigConverter.toJson(config)}
        trip={trip}
    />;
}

export default PageWrapper;