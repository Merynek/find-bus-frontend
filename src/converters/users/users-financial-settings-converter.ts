import {
    type UserFinancialSettingsRequestDto,
    UserFinancialSettingsResponseDto
} from "@/src/api/openapi";
import {UserAddress} from "@/src/data/users/userAddress";
import {UserAddressConverter} from "@/src/converters/users/user-address-converter";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";

export class UserFinancialSettingsConverter {

    public static toInstance(response: UserFinancialSettingsResponseDto): UserFinancialSettings {
        return new UserFinancialSettings({
            name: response.name,
            surname: response.surname,
            ico: response.ico,
            dic: response.dic,
            companyName: response.companyName,
            isCompany: response.isCompany,
            iban: response.iban,
            swift: response.swift,
            address: response.address ? UserAddressConverter.toInstance(response.address) : UserAddress.create(),
            mailingAddress: response.mailingAddress ? UserAddressConverter.toInstance(response.mailingAddress) : UserAddress.create()
        })
    }

    public static toJson(settings: UserFinancialSettings): UserFinancialSettingsResponseDto {
        return {
            name: settings.name,
            surname: settings.surname,
            ico: settings.ico,
            dic: settings.dic,
            companyName: settings.companyName,
            isCompany: settings.isCompany,
            iban: settings.iban,
            swift: settings.swift,
            address: settings.address ? UserAddressConverter.toJson(settings.address) : undefined,
            mailingAddress: settings.mailingAddress ? UserAddressConverter.toJson(settings.mailingAddress) : undefined
        }
    }

    public static toServer(settings: UserFinancialSettings): UserFinancialSettingsRequestDto {
        return {
            name: settings.name,
            surname: settings.surname,
            ico: settings.ico,
            dic: settings.dic,
            companyName: settings.companyName,
            isCompany: settings.isCompany,
            iban: settings.iban,
            swift: settings.swift,
            address: settings.address ? UserAddressConverter.toJson(settings.address) : undefined,
            mailingAddress: settings.mailingAddress ? UserAddressConverter.toJson(settings.mailingAddress) : undefined
        }
    }

}