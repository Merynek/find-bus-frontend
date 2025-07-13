import {UsersConverter} from "@/src/converters/users-converter";
import {UserRole} from "@/src/api/openapi";
import {
    activeUserAction, forgotPasswordAction,
    getUserAction,
    loginAction,
    logoutAction,
    signUpAction
} from "@/src/app/actions/auth/authActions";

export class AuthorizationService {
    public static async getUserJson() {
        const response = await getUserAction();
        if (response) {
            return response;
        }
        return null;
    }

    public static async getUser() {
        const response = await getUserAction();
        if (response) {
            return UsersConverter.currentUserToClient(response.user);
        }
        return null;
    }

    public static async login(email: string, password: string) {
        const response = await loginAction(email, password);
        return UsersConverter.currentUserToClient(response.user);
    }

    public static async logout() {
        await logoutAction();
    }

    public static signUp(email: string, password: string, role: UserRole) {
        return signUpAction(email, password, role);
    }

    public static async activeUser(token: string) {
        await activeUserAction(token);
    }

    public static async forgotPassword(token: string) {
        await forgotPasswordAction(token);
    }
}