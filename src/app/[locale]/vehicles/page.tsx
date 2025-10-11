import VehiclesPage from "@/src/components/pages/vehicles/vehicles.page";
import {PageProps} from "@/types/page.types";
import {VehicleService} from "@/src/services/VehicleService";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    try {
        const vehicles = await VehicleService.getVehicles({});
        return <VehiclesPage vehicles={vehicles} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;