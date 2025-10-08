import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {VehicleService} from "@/src/services/VehicleService";
import {URL_PARAMS} from "@/src/enums/router.enum";
import AdminVehicleEditPage from "@/src/components/pages/admin/vehicle-edit/admin-vehicle-edit.page";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";

interface IParams {
    [URL_PARAMS.VEHICLE_ID]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    try {
        const vehicle = await VehicleService.getVehicle(Number(params[URL_PARAMS.VEHICLE_ID]));

        return <AdminVehicleEditPage vehicle={VehicleConverter.toJson(vehicle)} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;