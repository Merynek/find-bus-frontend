import {UsersService} from "@/src/services/UsersService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import TransportRequirementsPage from "@/src/components/pages/transport-requirements/transport-requirements.page";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    try {
        const transportRequirements = await UsersService.getTransportRequirements();
        return <TransportRequirementsPage transportRequirements={TransportRequirementsConverter.toJson(transportRequirements)} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;