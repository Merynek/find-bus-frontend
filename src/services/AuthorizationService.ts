import {getAuthenticatedUser} from "@/src/app/actions/auth";
import {UsersConverter} from "@/src/converters/users-converter";

export class AuthorizationService {
    public static async getUser() {
        const response = await getAuthenticatedUser();
        if (response) {
            return UsersConverter.currentUserToClient(response.user);
        }
        return null;
    }
}