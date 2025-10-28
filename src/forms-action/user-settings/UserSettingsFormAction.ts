import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {UsersService} from "@/src/services/UsersService";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {ApiUsersTransportRequirementsPhotosPostRequest, UserSettingsRequestDto} from "@/src/api/openapi";
import {UserSettingsSchema} from "@/src/forms-action/user-settings/UserSettingsSchema";

type UserSettingsData = Partial<UserSettingsRequestDto & ApiUsersTransportRequirementsPhotosPostRequest>;

type UserSettingsApiResult = void;

export class UserSettingsFormAction extends BaseFormAction<typeof UserSettingsSchema, UserSettingsData, UserSettingsApiResult> {

    constructor() {
        super(UserSettingsSchema);
    }

    protected createDataFromFormData(formData: FormData): UserSettingsData {
        return {
            userFinancialSettings: {
                name: this.getStringFormValue(formData, FormDataEnum.name),
                surname: this.getStringFormValue(formData, FormDataEnum.surname),
                ico: this.getStringFormValue(formData, FormDataEnum.ico),
                dic: this.getStringFormValue(formData, FormDataEnum.dic),
                companyName: this.getStringFormValue(formData, FormDataEnum.companyName),
                isCompany: this.getBooleanFormValue(formData, FormDataEnum.isCompany),
                iban: this.getStringFormValue(formData, FormDataEnum.iban),
                swift: this.getStringFormValue(formData, FormDataEnum.swift),
                address: {
                    country: this.getEnumFormValue(formData, FormDataEnum.address_country),
                    city: this.getStringFormValue(formData, FormDataEnum.address_city),
                    psc: this.getStringFormValue(formData, FormDataEnum.address_psc),
                    street: this.getStringFormValue(formData, FormDataEnum.address_street),
                    houseNumber: this.getStringFormValue(formData, FormDataEnum.address_houseNumber),
                },
                mailingAddress: {
                    country: this.getEnumFormValue(formData, FormDataEnum.mailingAddress_country),
                    city: this.getStringFormValue(formData, FormDataEnum.mailingAddress_city),
                    psc: this.getStringFormValue(formData, FormDataEnum.mailingAddress_psc),
                    street: this.getStringFormValue(formData, FormDataEnum.mailingAddress_street),
                    houseNumber: this.getStringFormValue(formData, FormDataEnum.mailingAddress_houseNumber),
                }
            },
            phoneNumber: this.getStringFormValue(formData, FormDataEnum.phoneNumber),
            notifications: this.getEnumArrayFormValue(formData, FormDataEnum.notifications),
            transportRequirements: {
                concessionNumber: this.getStringFormValue(formData, FormDataEnum.concessionNumber)
            }
        };
    }

    protected async callApi(validatedData: z.infer<typeof UserSettingsSchema>): Promise<UserSettingsApiResult> {
        await UsersService.changeSettings(validatedData);

        // if (validatedData.businessRiskInsurance || validatedData.concessionDocuments) { // todo
        //     await UsersService.updateTransportRequirementsPhotos({
        //         businessRiskInsurance: validatedData.businessRiskInsurance || undefined,
        //         concessionDocuments: validatedData.concessionDocuments || undefined
        //     });
        // }
    }
}