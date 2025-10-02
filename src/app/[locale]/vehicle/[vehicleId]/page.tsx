import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {VehicleService} from "@/src/services/VehicleService";
import VehicleDetailPage from "@/src/components/pages/vehicle-detail/vehicle-detail.page";

interface IParams {
    vehicleId: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    try {
        const vehicle = await VehicleService.getVehicle(Number(params.vehicleId));

        return <VehicleDetailPage vehicle={vehicle} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;