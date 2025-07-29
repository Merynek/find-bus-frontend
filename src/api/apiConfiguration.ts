import {AppConfiguration} from "../singletons/AppConfiguration";
import {Configuration as OpenApiConfiguration } from "./openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {signOut} from "next-auth/react";

export class ApiConfiguration {
    public static createOpenApiConfig(accessToken: string|undefined): OpenApiConfiguration {
        return new OpenApiConfiguration({
            basePath: AppConfiguration.instance.getApiUrl(),
            accessToken: accessToken,
            fetchApi: async (input, init) => {
                try {
                    const response = await fetch(input, init);

                    if (response.status === 401) {
                        console.warn("API vráceno 401 Unauthorized. Odhlašuji uživatele.");
                        await signOut({ redirectTo: ROUTES.SIGN_IN });

                        throw new Error("Unauthorized access - user logged out.");
                    }

                    return response;
                } catch (error) {
                    console.error("Chyba při volání API:", error);
                    throw error;
                }
            }
        });
    }
}