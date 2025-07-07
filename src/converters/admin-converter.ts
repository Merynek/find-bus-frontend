import {
    AdminUserDetailResponseDto,
    AppBusinessConfigResponseDto,
    EmailConfigLocalizationResponseDto,
    EmailConfigResponseDto,
    EmailTemplateResponseDto
} from "../api/openapi";
import {AppBusinessConfig} from "../data/appBusinessConfig";
import {EmailConfig, EmailConfigLocalization, EmailTemplate} from "../data/emailConfig";
import {UserAdminDetail} from "../data/users/user-admin-detail";
import {UsersConverter} from "./users-converter";
import {VehicleConverter} from "./vehicle-converter";
import {TransferInfo} from "../data/transferInfo";
import {UserAddress} from "../data/users/userAddress";
import {TransportRequirements} from "../data/transportRequirements";

export class AdminConverter {
    public static appBusinessConfigToClient(response: AppBusinessConfigResponseDto): AppBusinessConfig {
        return new AppBusinessConfig({
            minDateToAcceptOfferInHours: response.minDateToAcceptOfferInHours,
            minEndOrderFromNowInHours: response.minEndOrderFromNowInHours,
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: response.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours,
            minDiffBetweenStartTripAndEndOrderInHours: response.minDiffBetweenStartTripAndEndOrderInHours,
            payRestOfPriceWarningBeforeStartTripInHours: response.payRestOfPriceWarningBeforeStartTripInHours,
            payInvoiceWarningAfterAcceptOfferInHours: response.payInvoiceWarningAfterAcceptOfferInHours,
            tripDepositInPercentage: response.tripDepositInPercentage,
            tripCancelFeePercentageForDemander: response.tripCancelFeePercentageForDemander,
            tripCancelFeeAfterLimitPercentageForDemander: response.tripCancelFeeAfterLimitPercentageForDemander,
            tripOfferCommissionPercentage: response.tripOfferCommissionPercentage,
            tripCancelPenaltyPercentageForTransporterFromCompany: response.tripCancelPenaltyPercentageForTransporterFromCompany,
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: response.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany,
            tripCancelPenaltyPercentageForTransporterFromDemander: response.tripCancelPenaltyPercentageForTransporterFromDemander,
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: response.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander,
            tripCancelPenaltyLimitInDays: response.tripCancelPenaltyLimitInDays,
            tripCancelPenaltyAfterLimitPercentageForTransporter:  response.tripCancelPenaltyAfterLimitPercentageForTransporter
        })
    }

    public static emailConfigToClient(response: EmailConfigResponseDto): EmailConfig {
        const userParams = new Map<string, string>();
        for (let [key, value] of Object.entries(response.userParams)) {
            if (value) {
                userParams.set(key, value);
            }
        }
        return new EmailConfig({
            templates: response.templates.map(AdminConverter.emailTemplateToClient),
            userParams: userParams
        })
    }

    public static emailTemplateToClient(apiTemplate: EmailTemplateResponseDto): EmailTemplate {
        const params = new Map<string, string>();
        for (let [key, value] of Object.entries(apiTemplate.params)) {
            if (value) {
                params.set(key.toUpperCase(), value);
            }
        }
        return new EmailTemplate({
            type: apiTemplate.type,
            localizations: apiTemplate.localizations.map(AdminConverter.emailConfigLocalizationToClient),
            params: params
        })
    }

    public static emailConfigLocalizationToClient(response: EmailConfigLocalizationResponseDto): EmailConfigLocalization {
        return new EmailConfigLocalization({
            language: response.language,
            templateId: response.templateId
        })
    }

    public static userAdminDetailToClient(response: AdminUserDetailResponseDto): UserAdminDetail {
        return new UserAdminDetail({
            id: response.id,
            email: response.email,
            isActive: response.active,
            isBanned: response.banned,
            isVerifiedForTransporting: response.isVerifiedForTransporting,
            name: response.name,
            surname: response.surname,
            phoneNumber: response.phoneNumber,
            ico: response.ico,
            dic: response.dic,
            isCompany: response.isCompany,
            address: response.address ? UsersConverter.userAddressToClient(response.address) : UserAddress.create(),
            mailingAddress: response.mailingAddress ? UsersConverter.userAddressToClient(response.mailingAddress) : UserAddress.create(),
            transferInfo: response.transferInfo ? UsersConverter.transferInfoToClient(response.transferInfo) : TransferInfo.create(),
            vehicles: response.vehicles.map(VehicleConverter.toClient),
            transportRequirements: response.transporterRequirements ? UsersConverter.transportRequirementsToClient(response.transporterRequirements) : TransportRequirements.create()
        })
    }
}