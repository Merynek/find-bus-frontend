'use client'

import React, {useEffect, useEffectEvent} from "react";
import {ROUTES, SEARCH_PARAMS} from "@/src/enums/router.enum";
import {logoutAction} from "@/src/server-actions/auth/authActions";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/src/i18n/navigation";
import {SignLayout} from "@/src/components/components/layout/page-wrapper/sign-layout";
import {SignInForm} from "@/src/components/compositions/sign/sign-in/sign-in-form";

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleUnauthorizedLogout = useEffectEvent(async () => {
        await logoutAction();
        router.push(ROUTES.SIGN_IN);
    });

    useEffect(() => {
        const unauthorized = searchParams.get(SEARCH_PARAMS.UNAUTHORIZED);
        if (unauthorized) {
            handleUnauthorizedLogout();
        }
    }, [searchParams]);

    return <SignLayout>
        <SignInForm showRegistrationSection={true} />
    </SignLayout>
};

export default LoginPage;