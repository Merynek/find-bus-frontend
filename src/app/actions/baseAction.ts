import {serializeError} from "@/src/errors/serializeError";

export const handleActionCall = async <T>(action: () => Promise<T>): Promise<T> => {
    try {
        return await action();
    } catch (error: unknown) {
        throw new Error(serializeError(error));
    }
}