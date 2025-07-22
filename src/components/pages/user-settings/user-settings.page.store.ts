import {UserSettings} from "@/src/data/users/userSettings";
import {makeObservable, observable} from "mobx";
import {UsersService} from "@/src/services/UsersService";
import {userSettingsFormAction} from "@/src/app/actions/forms/userSettings/userSettingsFormAction";

export class UserSettingsPageStore {
    @observable public userSettings: UserSettings|null;

    constructor() {
        makeObservable(this);
    }

    public async loadData() {
        this.userSettings = await UsersService.getSettings();
    }

    public async save() {
        if (!this.userSettings) {
            console.warn("Uživatelská nastavení nejsou k dispozici pro uložení.");
            return;
        }

        const formData = new FormData();

        if (this.userSettings.name !== undefined && this.userSettings.name !== null) formData.append('name', this.userSettings.name);
        if (this.userSettings.surname !== undefined && this.userSettings.surname !== null) formData.append('surname', this.userSettings.surname);
        if (this.userSettings.phoneNumber !== undefined && this.userSettings.phoneNumber !== null) formData.append('phoneNumber', this.userSettings.phoneNumber);
        if (this.userSettings.ico !== undefined && this.userSettings.ico !== null) formData.append('ico', this.userSettings.ico);
        if (this.userSettings.dic !== undefined && this.userSettings.dic !== null) formData.append('dic', this.userSettings.dic);
        if (this.userSettings.companyName !== undefined && this.userSettings.companyName !== null) formData.append('companyName', this.userSettings.companyName);
        if (this.userSettings.isCompany) formData.append('isCompany', 'on');
        if (this.userSettings.transportRequirements.concessionNumber !== undefined && this.userSettings.transportRequirements.concessionNumber !== null) formData.append('concessionNumber', this.userSettings.transportRequirements.concessionNumber);

        if (this.userSettings.notifications && this.userSettings.notifications.length > 0) {
            this.userSettings.notifications.forEach(notification => {
                formData.append('notifications', notification);
            });
        }
        const appendNestedObject = (obj: any, prefix: string) => {
            if (!obj) return;
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (key === 'country' && value !== undefined && value !== null) {
                        formData.append(`${prefix}.${key}`, value as string);
                    } else if (value !== undefined && value !== null) {
                        formData.append(`${prefix}.${key}`, value);
                    }
                }
            }
        };

        appendNestedObject(this.userSettings.address, 'address');
        appendNestedObject(this.userSettings.mailingAddress, 'mailingAddress');
        appendNestedObject(this.userSettings.transferInfo, 'transferInfo');

        if (this.userSettings.transportRequirements) {
            const { businessRiskInsurance, concessionDocuments } = this.userSettings.transportRequirements;

            if (businessRiskInsurance instanceof File) {
                formData.append('businessRiskInsurance', businessRiskInsurance);
            }
            if (concessionDocuments instanceof File) {
                formData.append('concessionDocuments', concessionDocuments);
            }
        }

        try {
            // První argument `state` je předchozí stav, pro první volání je `undefined`.
            const result = await userSettingsFormAction(undefined, formData);

            if (result && result.errors) {
                console.error("Odeslání formuláře selhalo (chyby validace):", result.errors);
                // Zde můžete aktualizovat stav komponenty, aby se zobrazily chyby uživateli
                // Např. `this.setState({ formErrors: result.errors });`
                return { success: false, errors: result.errors, message: result.message };
            } else if (result && result.message) {
                console.log("Odeslání formuláře úspěšné:", result.message);
                // Zde můžete zobrazit zprávu o úspěchu nebo provést další akce
                // Server Action již provádí redirect(ROUTES.VEHICLES), takže zde není potřeba.
                return { success: true, message: result.message };
            } else if (result && result.error) {
                console.error("Odeslání formuláře selhalo (serverová chyba):", result.error);
                return { success: false, error: result.error };
            } else {
                console.log("Odeslání formuláře dokončeno s neznámým výsledkem.");
                return { success: true, message: "Nastavení uloženo." }; // Defaultní zpráva
            }
        } catch (error) {
            console.error("Došlo k neočekávané chybě při volání Server Action:", error);
            return { success: false, error: "Došlo k neočekávané chybě při ukládání nastavení." };
        }


    }
}