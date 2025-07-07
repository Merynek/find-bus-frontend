import {autowired} from "ironbean";
import {UsersApi} from "@/src/api/usersApi";
import {UserSettings} from "@/src/data/users/userSettings";
import {makeObservable, observable} from "mobx";

export class UserSettingsPageStore {
    @autowired private _usersApi: UsersApi;
    @observable public userSettings: UserSettings|null;

    constructor() {
        makeObservable(this);
    }

    public async loadData() {
        this.userSettings = await this._usersApi.getSettings({})
    }

    public async save() {
        if (this.userSettings) {
            const requirements = this.userSettings.transportRequirements;
            await this._usersApi.changeSettings({
                settings: this.userSettings
            });
            (requirements.businessRiskInsurance || requirements.concessionDocuments) && await this._usersApi.updateTransportRequirementsPhotos({
                businessRiskInsurance: requirements.businessRiskInsurance,
                concessionDocuments: requirements.concessionDocuments
            });
        }
    }
}