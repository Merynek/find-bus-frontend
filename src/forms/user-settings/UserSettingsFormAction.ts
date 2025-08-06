import {BaseFormAction} from "@/src/forms/BaseFormAction";
import {UsersService} from "@/src/services/UsersService";
import {z} from "zod";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {ApiUsersTransportRequirementsPhotosPostRequest, UserSettingsRequestDto} from "@/src/api/openapi";
import {UserSettingsSchema} from "@/src/forms/user-settings/UserSettingsSchema";

type UserSettingsData = Partial<UserSettingsRequestDto & ApiUsersTransportRequirementsPhotosPostRequest>;

type UserSettingsApiResult = void;

export class UserSettingsFormAction extends BaseFormAction<typeof UserSettingsSchema, UserSettingsData, UserSettingsApiResult> {

    constructor() {
        super(UserSettingsSchema);
    }

    protected createDataFromFormData(formData: FormData): UserSettingsData {
        return {
            name: this.getStringFormValue(formData, FormDataEnum.name),
            surname: this.getStringFormValue(formData, FormDataEnum.surname),
            phoneNumber: this.getStringFormValue(formData, FormDataEnum.phoneNumber),
            ico: this.getStringFormValue(formData, FormDataEnum.ico),
            dic: this.getStringFormValue(formData, FormDataEnum.dic),
            companyName: this.getStringFormValue(formData, FormDataEnum.companyName),
            isCompany: this.getBooleanFormValue(formData, FormDataEnum.isCompany),
            notifications: this.getEnumArrayFormValue(formData, FormDataEnum.notifications),
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
            },
            transferInfo: {
                iban: this.getStringFormValue(formData, FormDataEnum.transferInfo_iban),
                swift: this.getStringFormValue(formData, FormDataEnum.transferInfo_swift),
            },
            concessionNumber: this.getStringFormValue(formData, FormDataEnum.concessionNumber),
            businessRiskInsurance: this.getFileFormValue(formData, FormDataEnum.businessRiskInsurance),
            concessionDocuments: this.getFileFormValue(formData, FormDataEnum.concessionDocuments),
        };
    }

    protected async callApi(validatedData: z.infer<typeof UserSettingsSchema>): Promise<UserSettingsApiResult> {
        await UsersService.changeSettings({
            name: validatedData.name,
            surname: validatedData.surname,
            phoneNumber: validatedData.phoneNumber,
            ico: validatedData.ico,
            dic: validatedData.dic,
            companyName: validatedData.companyName,
            isCompany: validatedData.isCompany,
            notifications: validatedData.notifications,
            address: validatedData.address || undefined,
            mailingAddress: validatedData.mailingAddress || undefined,
            transferInfo: validatedData.transferInfo || undefined,
            concessionNumber: validatedData.concessionNumber
        });

        if (validatedData.businessRiskInsurance || validatedData.concessionDocuments) {
            await UsersService.updateTransportRequirementsPhotos({
                businessRiskInsurance: validatedData.businessRiskInsurance || undefined,
                concessionDocuments: validatedData.concessionDocuments || undefined
            });
        }
    }
}