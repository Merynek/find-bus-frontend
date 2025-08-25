import {useSession} from "next-auth/react";
import {UsersConverter} from "@/src/converters/users/users-converter";
import {User} from "@/src/data/users/user";

interface IUseLoggedUser {
    user: User|null;
}

export const useLoggedUser = (): IUseLoggedUser  => {
    const {data} = useSession();

    return {
        user: data ? UsersConverter.currentUserToInstance(data.user) : null
    }
}