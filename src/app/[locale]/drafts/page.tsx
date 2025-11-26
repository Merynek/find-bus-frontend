import {TripService} from "@/src/services/TripService";
import TripDraftListPage from "@/src/components/pages/trip-draft-list/trip-draft-list.page";

async function PageWrapper()  {
    const items = await TripService.getDraftTrips();

    return <TripDraftListPage
        items={items}
    />;
}

export default PageWrapper;