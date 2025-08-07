import VehiclePage from "@/src/components/pages/vehicles/vehicles.page";
import {PageProps} from "@/types/page.types";
import {VehicleService} from "@/src/services/VehicleService";
import {VehicleConverter} from "@/src/converters/vehicle-converter";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    const vehicles = await VehicleService.getVehicles(params.locale);

    return <VehiclePage vehicles={vehicles.map(VehicleConverter.toJson)} />;
}

export default PageWrapper;