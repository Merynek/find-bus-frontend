import {UserRole} from "@/src/api/openapi";
import {
    activeUserAction, forgotPasswordAction,
    getUserAction,
    loginAction,
    logoutAction, resetPasswordAction,
    signUpAction
} from "@/src/app/actions/auth/authActions";
import {UsersConverter} from "@/src/converters/users/users-converter";

export class AuthorizationService {
    public static async getUserJson() {
        const response = await getUserAction();
        if (response) {
            return response;
        }
        return null;
    }

    public static async getUser() {
        const data = await AuthorizationService.getUserJson();
        if (data) {
            return UsersConverter.currentUserToInstance(data.user);
        }
        return null;
    }

    public static async login(email: string, password: string) {
        const response = await loginAction(email, password);
        return UsersConverter.currentUserToInstance(response.user);
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

    public static async resetPassword(token: string, password: string, confirmPassword: string) {
        await resetPasswordAction(token, password, confirmPassword);
    }
}