import {useSession} from "next-auth/react";
import {CurrentUserDto} from "@/src/api/openapi";

interface IUseLoggedUser {
    user: CurrentUserDto|null;
}

export const useLoggedUser = (): IUseLoggedUser  => {
    const {data} = useSession();

    return {
        user: data?.user || null
    }
}