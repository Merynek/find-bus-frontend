import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {URL_PARAMS} from "@/src/enums/router.enum";
import {UsersService} from "@/src/services/UsersService";
import {AdminService} from "@/src/services/AdminService";
import {AdminUserDetail} from "@/src/components/compositions/admin/admin-user-detail/admin-user-detail";

interface IParams {
    [URL_PARAMS.USER_ID]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    let tripId;
    let appConfig;
    let user;

    try {
        tripId = parseInt(params[URL_PARAMS.USER_ID]);
        user = await UsersService.getUserDetail(tripId);
        appConfig = await AdminService.getAppBusinessConfig();
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <AdminUserDetail
        user={user}
        config={appConfig}
    />;
}

export default PageWrapper;