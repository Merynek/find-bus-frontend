import TripDetailPage from "@/src/components/pages/trip-detail/trip-detail.page";

interface TripDetailPageProps {
    params: {
        tripId: string;
    };
}

function PageWrapper(props: TripDetailPageProps)  {
    return <TripDetailPage {...props} />;
}

export default PageWrapper;