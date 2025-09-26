"use client";

import { SessionProvider } from 'next-auth/react';
import {ReactNode} from "react";

interface IProps {
    userId: number;
    children: ReactNode;
}

export default function NextAuthProvider(props: IProps) {
    const {children, userId} = props;
    return (
        <SessionProvider key={userId}>
            {children}
        </SessionProvider>
    );
}