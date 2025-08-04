import {UserRole} from "@/src/api/openapi";
import {
    activeUserAction, forgotPasswordAction, getLoggerUserSession,
    loginAction,
    logoutAction, resetPasswordAction,
    signUpAction
} from "@/src/app/actions/auth/authActions";
import {UsersConverter} from "@/src/converters/users/users-converter";

export class AuthorizationService {
    public static async getLoggerUser() {
        const user = await getLoggerUserSession();
        return user ? UsersConverter.currentUserToInstance(user) : null;
    }

    public static async login(email: string, password: string) {
        await loginAction(email, password);
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