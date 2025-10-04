import {
    AdminUserDetailResponseDto
} from "@/src/api/openapi";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {TransferInfo} from "@/src/data/transferInfo";
import {UserAddress} from "@/src/data/users/userAddress";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";
import {UserAddressConverter} from "@/src/converters/users/user-address-converter";
import {TransferInfoConverter} from "@/src/converters/users/transfer-info-converter";
import {UserConfigConverter} from "@/src/converters/admin/user-config-converter";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";

export class UserAdminDetailConverter {

    public static toInstance(response: AdminUserDetailResponseDto): UserAdminDetail {
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
            address: response.address ? UserAddressConverter.toInstance(response.address) : UserAddress.create(),
            mailingAddress: response.mailingAddress ? UserAddressConverter.toInstance(response.mailingAddress) : UserAddress.create(),
            transferInfo: response.transferInfo ? TransferInfoConverter.toInstance(response.transferInfo) : TransferInfo.create(),
            vehicles: response.vehicles.map(VehicleConverter.toInstance),
            transportRequirements: response.transporterRequirements ? TransportRequirementsConverter.toInstance(response.transporterRequirements) : TransportRequirements.create(),
            userConfigs: response.userConfigs.map(UserConfigConverter.toInstance)
        })
    }

    public static toJson(user: UserAdminDetail): AdminUserDetailResponseDto {
        return {
            id: user.id,
            email: user.email,
            active: user.isActive,
            banned: user.isBanned,
            isVerifiedForTransporting: user.isVerifiedForTransporting,
            name: this.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber,
            ico: user.ico,
            dic: user.dic,
            isCompany: user.isCompany,
            address: UserAddressConverter.toJson(user.address),
            mailingAddress: UserAddressConverter.toJson(user.mailingAddress),
            transferInfo: TransferInfoConverter.toJson(user.transferInfo),
            vehicles: user.vehicles.map(v => VehicleConverter.toJson(v)),
            transporterRequirements: TransportRequirementsConverter.toJson(user.transportRequirements),
            userConfigs: user.userConfigs.map(UserConfigConverter.toJson)
        }
    }
}