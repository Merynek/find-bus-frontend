import {User} from "@/src/data/users/user";
import {
    CurrentUserDto, TransferInfoRequestDto, UserAddressRequestDto,
    UserDetailResponseDto,
    UserSettingsRequestDto,
    UserSettingsResponseDto
} from "@/src/api/openapi";
import { UserSettings } from "@/src/data/users/userSettings";
import {UserAddress} from "@/src/data/users/userAddress";
import {UserAddressConverter} from "@/src/converters/users/user-address-converter";
import {TransferInfoConverter} from "@/src/converters/users/transfer-info-converter";
import {TransferInfo} from "@/src/data/transferInfo";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {UserDetail} from "@/src/data/users/user-detail";
import {toJS} from "mobx";

export class UsersConverter {

    public static currentUserToInstance(currentUserDto: CurrentUserDto): User {
        return new User({
            id: currentUserDto.id,
            role: currentUserDto.role,
            email: currentUserDto.email
        })
    }

    public static userSettingsToInstance(settings: UserSettingsResponseDto): UserSettings {
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
            notifications: toJS(settings.notifications),
            address: UsersConverter.userAddressToServer(settings.address),
            isCompany: settings.isCompany,
            mailingAddress: UsersConverter.userAddressToServer(settings.mailingAddress),
            transferInfo: UsersConverter.transferInfoToServer(settings.transferInfo),
            concessionNumber: settings.transportRequirements.concessionNumber
        }
    }

    public static userSettingsToJson(settings: UserSettings): UserSettingsResponseDto {
        return {
            name: settings.name || "",
            surname: settings.surname || "",
            phoneNumber: settings.phoneNumber || "",
            ico: settings.ico || "",
            dic: settings.dic || "",
            companyName: settings.companyName || "",
            notifications: toJS(settings.notifications) || [],
            address: UserAddressConverter.toJson(settings.address),
            isCompany: settings.isCompany,
            mailingAddress: UserAddressConverter.toJson(settings.mailingAddress),
            transferInfo: TransferInfoConverter.toJson(settings.transferInfo),
            transporterRequirements: TransportRequirementsConverter.toJson(settings.transportRequirements),
            isVerifiedForTransporting: settings.isVerifiedForTransporting
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

    public static userDetailToInstance(response: UserDetailResponseDto): UserDetail {
        return new UserDetail({
            id: response.id
        });
    }
}