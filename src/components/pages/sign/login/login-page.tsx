'use client'

import React, {useCallback, useEffect} from "react";
import {ROUTES, SEARCH_PARAMS} from "@/src/enums/router.enum";
import {logoutAction} from "@/src/server-actions/auth/authActions";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/src/i18n/navigation";
import {SignLayout} from "@/src/components/components/layout/page-wrapper/sign-layout";
import {SignInForm} from "@/src/components/compositions/sign/sign-in/sign-in-form";

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleUnauthorizedLogout = useCallback(async () => {
        await logoutAction();
        router.push(ROUTES.SIGN_IN);
    }, [router]);

    useEffect(() => {
        const unauthorized = searchParams.get(SEARCH_PARAMS.UNAUTHORIZED);
        if (unauthorized) {
            handleUnauthorizedLogout();
        }
    }, [searchParams, handleUnauthorizedLogout]);

    return <SignLayout>
        <SignInForm />
    </SignLayout>
};

export default LoginPage;