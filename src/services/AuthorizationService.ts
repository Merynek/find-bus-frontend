import {UserRole} from "@/src/api/openapi";
import {
    activeUserAction, forgotPasswordAction, getLoggerUserSession,
    loginAction,
    logoutAction, resetPasswordAction,
    signUpAction
} from "@/src/server-actions/auth/authActions";
import {BaseService} from "@/src/services/BaseService";
import {User} from "@/src/data/users/user";
import {CurrentUsersConverter} from "@/src/converters/users/current-users-converter";

export class AuthorizationService extends BaseService {
    public static async getLoggerUser(): Promise<User|null> {
        return await this.handleActionCall(async () => {
            const user = await getLoggerUserSession();
            return user ? CurrentUsersConverter.toInstance(user) : null;
        })
    }

    public static async login(email: string, password: string) {
        await this.handleActionCall(async () => {
            await loginAction(email, password)
        });
    }

    public static async logout() {
        await this.handleActionCall(async () => {
            await logoutAction();
        });
    }

    public static async signUp(email: string, password: string, role: UserRole) {
        return await this.handleActionCall(async () => {
            return await signUpAction(email, password, role);
        });
    }

    public static async activeUser(token: string) {
        await this.handleActionCall(async () => {
            await activeUserAction(token);
        });
    }

    public static async forgotPassword(token: string) {
        await this.handleActionCall(async () => {
            await forgotPasswordAction(token);
        });
    }

    public static async resetPassword(token: string, password: string, confirmPassword: string) {
        await this.handleActionCall(async () => {
            await resetPasswordAction(token, password, confirmPassword);
        });
    }
}