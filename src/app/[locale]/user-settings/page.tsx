import UserSettingsPage from "@/src/components/pages/user-settings/user-settings.page";
import {UsersService} from "@/src/services/UsersService";
import {PageProps} from "@/types/page.types";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {UserSettingsConverter} from "@/src/converters/users/user-settings-converter";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    let userSettings;
    try {
        userSettings = await UsersService.getSettings();
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, params.locale);
    }
    return <UserSettingsPage settings={UserSettingsConverter.toJson(userSettings)} />;
}

export default PageWrapper;