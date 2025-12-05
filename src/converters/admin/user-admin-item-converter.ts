import {
    AdminUserDetailResponseDto
} from "@/src/api/openapi";
import {UserAdminItem} from "@/src/data/users/user-admin-item";

export class UserAdminItemConverter {

    public static toInstance(response: AdminUserDetailResponseDto): UserAdminItem {
        return new UserAdminItem({
            id: response.id,
            email: response.email,
            isActive: response.active,
            isBanned: response.banned
        })
    }

    public static toJson(user: UserAdminItem): AdminUserDetailResponseDto {
        return {
            id: user.id,
            email: user.email,
            active: user.isActive,
            banned: user.isBanned,
            financialSettings: undefined,
            phoneNumber: "",
            vehicles: [],
            transportRequirementsId: null,
            userConfigs: []
        }
    }
}