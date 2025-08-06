import {BaseFormAction} from "@/src/forms/BaseFormAction";
import {CreateUserSettingsData, UserSettingsSchema} from "@/src/app/actions/forms/userSettings/userSettingsSchema";
import {UsersService} from "@/src/services/UsersService";
import {z} from "zod";

type UserSettingsData = ReturnType<typeof CreateUserSettingsData>;

export class UserSettingsFormAction extends BaseFormAction<typeof UserSettingsSchema, UserSettingsData, any> {

    constructor() {
        super(UserSettingsSchema);
    }

    protected createDataFromFormData(formData: FormData): UserSettingsData {
        return CreateUserSettingsData(formData);
    }

    protected async callApi(validatedData: z.infer<typeof UserSettingsSchema>): Promise<any> {
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
        return validatedData;
    }
}