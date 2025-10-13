import {
    UserDetailResponseDto
} from "@/src/api/openapi";
import {UserDetail} from "@/src/data/users/user-detail";

export class UsersConverter {

    public static userDetailToJson(userDetail: UserDetail): UserDetailResponseDto {
        return {
            id: userDetail.id
        }
    }

    public static userDetailToInstance(response: UserDetailResponseDto): UserDetail {
        return new UserDetail({
            id: response.id
        });
    }
}