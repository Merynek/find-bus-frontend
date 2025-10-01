import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import VehicleEditPage from "@/src/components/pages/vehicle-edit/vehicle-edit.page";
import {VehicleService} from "@/src/services/VehicleService";

interface IParams {
    vehicleId: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    try {
        const vehicle = await VehicleService.getVehicle(Number(params.vehicleId));

        return <VehicleEditPage vehicle={vehicle} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;