import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import VehicleEditPage from "@/src/components/pages/vehicle-edit/vehicle-edit.page";
import {VehicleService} from "@/src/services/VehicleService";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {URL_PARAMS} from "@/src/enums/router.enum";

interface IParams {
    [URL_PARAMS.VEHICLE_ID]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    try {
        const vehicle = await VehicleService.getVehicle(Number(params[URL_PARAMS.VEHICLE_ID]));

        return <VehicleEditPage vehicle={VehicleConverter.toJson(vehicle)} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;