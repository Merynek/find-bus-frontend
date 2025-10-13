import {useSession} from "next-auth/react";
import {User} from "@/src/data/users/user";
import {CurrentUsersConverter} from "@/src/converters/users/current-users-converter";

interface IUseLoggedUser {
    user: User|null;
}

export const useLoggedUser = (): IUseLoggedUser  => {
    const {data} = useSession();

    return {
        user: data ? CurrentUsersConverter.toInstance(data.user) : null
    }
}