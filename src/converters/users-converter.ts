import {UserSettings} from "../data/users/userSettings";
import {
    CurrentUserDto, TransferInfoRequestDto, TransferInfoResponseDto, TransporterRequirementsResponseDto,
    UserAddressRequestDto,
    UserAddressResponseDto,
    UserDetailResponseDto,
    UserSettingsResponseDto
} from "../api/openapi";
import {UserSettingsRequestDto} from "../api/openapi";
import {User} from "../data/users/user";
import {UserDetail} from "../data/users/user-detail";
import {UserAddress} from "../data/users/userAddress";
import {TransferInfo} from "../data/transferInfo";
import {TransportRequirements} from "../data/transportRequirements";
import {Photo} from "../data/media/photo";

export class UsersConverter {
    private static concessionDocumentsPath = "ConcessionDocument/";
    private static businessRiskInsurancePath = "BusinessRiskInsurance/";

    public static currentUserToClient(currentUserDto: CurrentUserDto): User {
        return new User({
            id: currentUserDto.id,
            role: currentUserDto.role,
            email: currentUserDto.email
        })
    }

    public static userSettingsToClient(settings: UserSettingsResponseDto): UserSettings {
        return new UserSettings({
            name: settings.name || "",
            surname: settings.surname || "",
            phoneNumber: settings.phoneNumber || "",
            ico: settings.ico || "",
            dic: settings.dic || "",
            companyName: settings.companyName || "",
            notifications: settings.notifications || [],
            isCompany: settings.isCompany,
            address: settings.address ? UsersConverter.userAddressToClient(settings.address) : UserAddress.create(),
            mailingAddress: settings.mailingAddress ? UsersConverter.userAddressToClient(settings.mailingAddress) : UserAddress.create(),
            transferInfo: settings.transferInfo ? UsersConverter.transferInfoToClient(settings.transferInfo) : TransferInfo.create(),
            transportRequirements: settings.transporterRequirements ? UsersConverter.transportRequirementsToClient(settings.transporterRequirements) : TransportRequirements.create(),
            isVerifiedForTransporting: settings.isVerifiedForTransporting
        })
    }

    public static transferInfoToClient(response: TransferInfoResponseDto): TransferInfo {
        return new TransferInfo({
            iban: response.iban,
            swift: response.swift
        });
    }

    public static userAddressToClient(response: UserAddressResponseDto): UserAddress {
        return new UserAddress({
            country: response.country || null,
            houseNumber: response.houseNumber,
            psc: response.psc,
            city: response.city,
            street: response.street
        })
    }

    public static transportRequirementsToClient(response: TransporterRequirementsResponseDto): TransportRequirements {
        return new TransportRequirements({
            concessionNumber: response.concessionNumber || "",
            businessRiskInsurance: response.businessRiskInsurance ? new Photo({
                id: response.businessRiskInsurance.id,
                path: UsersConverter.businessRiskInsurancePath + response.businessRiskInsurance.path
            }) : null,
            concessionDocuments: response.concessionDocuments ? new Photo({
                id: response.concessionDocuments.id,
                path: UsersConverter.concessionDocumentsPath + response.concessionDocuments.path
            }) : null,
        })
    }

    public static userSettingsToServer(settings: UserSettings): UserSettingsRequestDto {
        return {
            name: settings.name || "",
            surname: settings.surname || "",
            phoneNumber: settings.phoneNumber || "",
            ico: settings.ico || "",
            dic: settings.dic || "",
            companyName: settings.companyName || "",
            notifications: settings.notifications || [],
            address: UsersConverter.userAddressToServer(settings.address),
            isCompany: settings.isCompany,
            mailingAddress: UsersConverter.userAddressToServer(settings.mailingAddress),
            transferInfo: UsersConverter.transferInfoToServer(settings.transferInfo),
            concessionNumber: settings.transportRequirements.concessionNumber
        }
    }

    public static userAddressToServer(address: UserAddress): UserAddressRequestDto {
        return {
            country: address.country || undefined,
            city: address.city,
            houseNumber: address.houseNumber,
            psc: address.psc,
            street: address.street
        }
    }

    public static transferInfoToServer(info: TransferInfo): TransferInfoRequestDto {
        return {
            iban: info.iban,
            swift: info.swift
        }
    }

    public static userDetailToClient(response: UserDetailResponseDto): UserDetail {
        return new UserDetail({
            id: response.id
        });
    }
}