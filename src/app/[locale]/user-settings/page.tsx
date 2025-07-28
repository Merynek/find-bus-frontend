import UserSettingsPage from "@/src/components/pages/user-settings/user-settings.page";
import {UsersService} from "@/src/services/UsersService";
import {UsersConverter} from "@/src/converters/users/users-converter";

async function PageWrapper() {
    const userSettings = await UsersService.getSettings();
    return <UserSettingsPage settings={UsersConverter.userSettingsToJson(userSettings)} />;
}

export default PageWrapper;