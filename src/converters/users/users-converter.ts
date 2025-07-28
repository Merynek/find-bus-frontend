import {UserSettings} from "../data/users/userSettings";
import {
    CurrentUserDto, TransferInfoRequestDto,
    UserAddressRequestDto,
    UserDetailResponseDto,
    UserSettingsResponseDto
} from "../api/openapi";
import {UserSettingsRequestDto} from "../api/openapi";
import {User} from "../data/users/user";
import {UserDetail} from "../data/users/user-detail";
import {UserAddress} from "../data/users/userAddress";
import {TransferInfo} from "../data/transferInfo";
import {TransportRequirements} from "../data/transportRequirements";
import {TransportRequirementsConverter} from "@/src/converters/transport-requirements-converter";
import {TransferInfoConverter} from "@/src/converters/transfer-info-converter";
import {UserAddressConverter} from "@/src/converters/user-address-converter";

export class UsersConverter {

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
            address: settings.address ? UserAddressConverter.toInstance(settings.address) : UserAddress.create(),
            mailingAddress: settings.mailingAddress ? UserAddressConverter.toInstance(settings.mailingAddress) : UserAddress.create(),
            transferInfo: settings.transferInfo ? TransferInfoConverter.toInstance(settings.transferInfo) : TransferInfo.create(),
            transportRequirements: settings.transporterRequirements ? TransportRequirementsConverter.toInstance(settings.transporterRequirements) : TransportRequirements.create(),
            isVerifiedForTransporting: settings.isVerifiedForTransporting
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

    public static userDetailToJson(userDetail: UserDetail): UserDetailResponseDto {
        return {
            id: userDetail.id
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