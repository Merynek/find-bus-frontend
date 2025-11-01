import {Country, type UserAddressRequestDto, UserAddressResponseDto} from "@/src/api/openapi";
import {UserAddress} from "@/src/data/users/userAddress";

export class UserAddressConverter {
    public static toInstance(response: UserAddressResponseDto): UserAddress {
        return new UserAddress({
            country: response.country || null,
            houseNumber: response.houseNumber,
            psc: response.psc,
            city: response.city,
            street: response.street
        })
    }

    public static toJson(address: UserAddress): UserAddressResponseDto {
        return {
            street: address.street,
            city: address.city,
            psc: address.psc,
            houseNumber: address.houseNumber,
            country: address.country || undefined
        }
    }

    public static toServer(address: UserAddress): UserAddressRequestDto {
        return {
            street: address.street,
            city: address.city,
            psc: address.psc,
            houseNumber: address.houseNumber,
            country: address.country || Country.CZ
        }
    }
}