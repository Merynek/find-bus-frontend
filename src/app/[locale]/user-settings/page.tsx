import UserSettingsPage from "@/src/components/pages/user-settings/user-settings.page";
import {UsersService} from "@/src/services/UsersService";
import {UsersConverter} from "@/src/converters/users/users-converter";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    try {
        const userSettings = await UsersService.getSettings();
        return <UserSettingsPage settings={UsersConverter.userSettingsToJson(userSettings)} />;
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
}

export default PageWrapper;