import {PageProps} from "@/types/page.types";
import {URL_PARAMS} from "@/src/enums/router.enum";
import {ReviewPage} from "@/src/components/pages/review/review-page";
import {TripService} from "@/src/services/TripService";
import {TripReviewDataConverter} from "@/src/converters/review/trip-review-data-converter";

interface IParams {
    [URL_PARAMS.TOKEN]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    const tripReview = await TripService.getTripReview({token: params[URL_PARAMS.TOKEN]});

    return <ReviewPage
        data={tripReview ? TripReviewDataConverter.toJson(tripReview) : null}
    />;
}

export default PageWrapper;