import TripListPage from "@/src/components/pages/trip-list/trip-list.page";
import {PageProps} from "@/types/page.types";
import {TripService} from "@/src/services/TripService";
import {parseBooleanParam, parseNumberParam} from "@/src/utils/search-params-validator";
import {ITripFilterParams} from "@/src/components/compositions/trip/trip-filter/trip-filter-types";

interface IParams {
    page?: string;
    dietForTransporter?: string;
    numberOfPersons?: string;
    onlyMine?: string;
    meOffered?: string;
    distanceFrom?: string;
    distanceTo?: string;
    maxDistanceInMeters?: string;
}

async function PageWrapper(props: PageProps<Record<string, never>, IParams>)  {
    const searchParams = await props.searchParams;
    const page = searchParams?.page ? parseNumberParam(searchParams?.page, 1) : undefined;
    const distanceFromInKm = searchParams?.distanceFrom ? parseNumberParam(searchParams?.distanceFrom, 0) : undefined;
    const distanceToInKm = searchParams?.distanceTo ? parseNumberParam(searchParams?.distanceTo, 0) : undefined;
    const maxDistanceInMeters = searchParams?.maxDistanceInMeters ? parseNumberParam(searchParams?.maxDistanceInMeters, 0) : undefined;

    const createParams = (): ITripFilterParams => {
        return {
            page: page,
            dietForTransporter: searchParams?.dietForTransporter ? parseBooleanParam(searchParams?.dietForTransporter, false) : undefined,
            maxNumberOfPersons: searchParams?.numberOfPersons ? parseNumberParam(searchParams?.numberOfPersons, 0) : undefined,
            onlyMine: searchParams?.onlyMine ? parseBooleanParam(searchParams?.onlyMine, false) : undefined,
            meOffered: searchParams?.meOffered ? parseBooleanParam(searchParams?.onlyMine, false) : undefined,
            distanceFromInKm: distanceFromInKm && distanceFromInKm > 0 ? distanceFromInKm : undefined,
            distanceToInKm: distanceToInKm && distanceToInKm > 0 ? distanceToInKm : undefined,
            maxDistanceInMeters: maxDistanceInMeters && maxDistanceInMeters > 0 ? maxDistanceInMeters : undefined,
        }
    }
    const filterParams = createParams();

    const items = await TripService.getTrips({
        limit: 5,
        offset: page ? (page - 1) * 5 : 0,
        maxNumberOfPersons: filterParams.maxNumberOfPersons,
        dietForTransporter: filterParams.dietForTransporter,
        onlyMine: filterParams.onlyMine,
        meOffered: filterParams.meOffered,
        distanceFromInKm: filterParams.distanceFromInKm,
        distanceToInKm: filterParams.distanceToInKm,
        maxDistanceInMeters: filterParams.maxDistanceInMeters
    });

    return <TripListPage
        items={items}
        params={filterParams}
    />;
}

export default PageWrapper;