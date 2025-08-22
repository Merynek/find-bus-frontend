import {FindBusError} from "@/src/errors/FindBusError";

export abstract class BaseService {
    protected static async handleActionCall<T>(action: () => Promise<T>): Promise<T> {
        try {
            return await action();
        } catch (error: unknown) {
            const fbError = FindBusError.fromError(error);
            if (fbError) {
                throw fbError;
            }
            throw error;
        }
    }
}