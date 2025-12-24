import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {AdminService} from "@/src/services/AdminService";
import AdminReviewsPage from "@/src/components/pages/admin/reviews/admin-reviews.page";

interface ISearchParams {
    offset?: string;
    limit?: string;
}

async function PageWrapper(props: PageProps<Record<string, never>, ISearchParams>) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    try {
        const reviews = await AdminService.getTripReviews({
            offset: searchParams?.offset ? Number(searchParams?.offset) : 0,
            limit: searchParams?.limit ? Number(searchParams?.limit) : 200
        });
        return <AdminReviewsPage reviews={reviews} />
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;