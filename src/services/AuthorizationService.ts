import {getUserAction} from "@/src/app/actions/auth/auth";
import {UsersConverter} from "@/src/converters/users-converter";
import {ILoginRequest} from "@/src/api/authorizeApi";

export class AuthorizationService {
    public static async getUser() {
        const response = await getUserAction();
        if (response) {
            return UsersConverter.currentUserToClient(response.user);
        }
        return null;
    }

    public static async login(req: ILoginRequest) {

    }
}