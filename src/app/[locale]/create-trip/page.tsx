import CreateTripPage from "@/src/components/pages/create-trip/create-trip-page";
import {AdminService} from "@/src/services/AdminService";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";

async function PageWrapper() {
    const config = await AdminService.getAppBusinessConfig();
    return <CreateTripPage
        cfg={AppBusinessConfigConverter.toJson(config)}
    />;
}

export default PageWrapper;