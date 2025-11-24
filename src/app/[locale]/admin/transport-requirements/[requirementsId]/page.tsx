import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {URL_PARAMS} from "@/src/enums/router.enum";
import {UsersService} from "@/src/services/UsersService";
import AdminTransportRequirementsPage
    from "@/src/components/pages/admin/transport-requirements/admin-transport-requirements.page";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";

interface IParams {
    [URL_PARAMS.REQUIREMENTS_ID]: string;
}

async function PageWrapper(props: PageProps<IParams>) {
    const params = await props.params;
    let requirements;
    try {
        requirements = await UsersService.getUserTransportRequirements(Number(params[URL_PARAMS.REQUIREMENTS_ID]));
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <AdminTransportRequirementsPage requirements={TransportRequirementsConverter.toJson(requirements)} />;
}

export default PageWrapper;