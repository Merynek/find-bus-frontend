import CreateTripPage from "@/src/components/pages/create-trip/create-trip-page";
import {AdminService} from "@/src/services/AdminService";

async function PageWrapper()  {
    const config = await AdminService.getAppBusinessConfig();
    return <CreateTripPage
        cfg={config}
    />;
}

export default PageWrapper;