import UserSettingsPage from "@/src/components/pages/user-settings/user-settings.page";
import {UsersService} from "@/src/services/UsersService";
import {UsersConverter} from "@/src/converters/users/users-converter";
import {PageProps} from "@/types/page.types";

async function PageWrapper(props: PageProps) {
    const params = await props.params;
    const userSettings = await UsersService.getSettings(params.locale);
    return <UserSettingsPage settings={UsersConverter.userSettingsToJson(userSettings)} />;
}

export default PageWrapper;