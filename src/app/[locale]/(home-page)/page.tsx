import HomePage from "@/src/components/pages/homepage/home-page";
import {ReviewService} from "@/src/services/ReviewService";
import {ReviewConverter} from "@/src/converters/review/review-converter";

async function PageWrapper()  {
    const reviews = await ReviewService.getPlatformReviews({
        offset: 0,
        limit: 200
    })
    return <HomePage reviews={reviews.map(ReviewConverter.toJson)} />;
}

export default PageWrapper;