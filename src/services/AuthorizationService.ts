import {UserRole} from "@/src/api/openapi";
import {
    activeUserAction, forgotPasswordAction,
    loginAction,
    logoutAction, resetPasswordAction,
    signUpAction
} from "@/src/app/actions/auth/authActions";

export class AuthorizationService {
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