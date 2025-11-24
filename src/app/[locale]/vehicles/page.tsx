import VehiclesPage from "@/src/components/pages/vehicles/vehicles.page";
import {PageProps} from "@/types/page.types";
import {VehicleService} from "@/src/services/VehicleService";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    let vehicles;
    try {
        vehicles = await VehicleService.getVehicles({});
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <VehiclesPage vehicles={vehicles} />;
}

export default PageWrapper;