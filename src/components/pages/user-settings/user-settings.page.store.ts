import {autowired} from "ironbean";
import {UsersApi} from "@/src/api/usersApi";
import {UserSettings} from "@/src/data/users/userSettings";
import {makeObservable, observable} from "mobx";
import {UsersConverter} from "@/src/converters/users-converter";
import {UsersService} from "@/src/services/UsersService";

export class UserSettingsPageStore {
    @autowired private _usersApi: UsersApi;
    @observable public userSettings: UserSettings|null;

    constructor() {
        makeObservable(this);
    }

    public async loadData() {
        this.userSettings = await UsersService.getSettings();
    }

    public async save() {
        if (this.userSettings) {
            const requirements = this.userSettings.transportRequirements;
            await UsersService.changeSettings(UsersConverter.userSettingsToServer(this.userSettings));

            (requirements.businessRiskInsurance || requirements.concessionDocuments) && await this._usersApi.updateTransportRequirementsPhotos({
                businessRiskInsurance: requirements.businessRiskInsurance,
                concessionDocuments: requirements.concessionDocuments
            });
        }
    }
}