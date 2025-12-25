import {PageProps} from "@/types/page.types";
import {URL_PARAMS} from "@/src/enums/router.enum";
import {ReviewPage} from "@/src/components/pages/review/review-page";
import {TripReviewDataConverter} from "@/src/converters/review/trip-review-data-converter";
import {ReviewService} from "@/src/services/ReviewService";

interface IParams {
    [URL_PARAMS.TOKEN]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    const token = params[URL_PARAMS.TOKEN];
    const tripReview = await ReviewService.getTripReviewForSubmit({token: token});

    return <ReviewPage
        data={tripReview ? TripReviewDataConverter.toJson(tripReview) : null}
        token={token}
    />;
}

export default PageWrapper;