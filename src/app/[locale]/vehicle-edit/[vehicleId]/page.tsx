import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import VehicleEditPage from "@/src/components/pages/vehicle-edit/vehicle-edit.page";
import {VehicleService} from "@/src/services/VehicleService";
import {URL_PARAMS} from "@/src/enums/router.enum";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";

interface IParams {
    [URL_PARAMS.VEHICLE_ID]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    let vehicle;
    try {
        vehicle = await VehicleService.getVehicle(Number(params[URL_PARAMS.VEHICLE_ID]));
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <VehicleEditPage vehicle={VehicleConverter.toJson(vehicle)} />;
}

export default PageWrapper;