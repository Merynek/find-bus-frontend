import {User} from "@/src/data/users/user";
import {
    CurrentUserDto,
} from "@/src/api/openapi";

export class CurrentUsersConverter {

    public static toInstance(currentUserDto: CurrentUserDto): User {
        return new User({
            id: currentUserDto.id,
            role: currentUserDto.role,
            email: currentUserDto.email
        })
    }

    public static currentUserToJson(user: User): CurrentUserDto {
        return {
            id: user.id,
            role: user.role,
            email: user.email
        }
    }
}