"use client"

import {User} from "@/src/data/users/user";
import {createContext, ReactNode, useContext, useMemo, useState} from "react";
import {type CurrentUserDto} from "@/src/api/openapi";
import {UsersConverter} from "@/src/converters/users/users-converter";

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
    userDto: CurrentUserDto|null;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const {children, userDto} = props;
    const [user] = useState<User | null>(userDto ? UsersConverter.currentUserToInstance(userDto) : null);

    const value = useMemo(() => ({
        user
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth musí být použit uvnitř AuthProvideru');
    }
    return context;
};