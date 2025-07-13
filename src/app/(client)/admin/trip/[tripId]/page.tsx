import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";

interface TripDetailPageProps {
    params: {
        tripId: string;
    };
}

function PageWrapper(props: TripDetailPageProps)  {
    return <AdminTripDetailPage {...props} />;
}

export default PageWrapper;