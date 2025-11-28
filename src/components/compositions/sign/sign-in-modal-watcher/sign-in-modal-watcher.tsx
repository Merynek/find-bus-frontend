'use client';

import React, {useCallback, useEffect, useState} from "react";
import {SignModal} from "@/src/components/compositions/sign/sign-modal/sign-modal";
import {SEARCH_PARAMS, SEARCH_PARAMS_VALUE} from "@/src/enums/router.enum";
import {useSearchParams} from "next/navigation";
import {usePathname, useRouter} from "@/src/i18n/navigation";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useCurrentLocale} from "@/src/hooks/translateHook";

interface ISignInModalWatcherProps {
    children: React.ReactNode;
}

export const SignInModalWatcher = (props: ISignInModalWatcherProps) => {
    const {children} = props;
    const router = useRouter();
    const locale = useCurrentLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {user} = useLoggedUser();
    const [signDialogOpen, setSignDialogOpen] = useState(false);

    const removeActionParam = useCallback(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete(SEARCH_PARAMS.ACTION);
        const newQuery = Object.fromEntries(currentParams.entries());
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            {pathname, newQuery},
            {locale: locale}
        );
    }, [searchParams, router, pathname, locale]);

    useEffect(() => {
        const action = searchParams.get(SEARCH_PARAMS.ACTION);
        const loginRequired = action === SEARCH_PARAMS_VALUE.LOGIN_REQUIRED;

        if (loginRequired && user === null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSignDialogOpen(true);
        } else {
            setSignDialogOpen(false);
        }

        if (loginRequired && user !== null) {
            removeActionParam();
        }
    }, [user, searchParams, pathname, locale, router, removeActionParam])

    const onClose = async () => {
        removeActionParam();
        setSignDialogOpen(false);
    };

    return <>
        {children}
        <SignModal
            open={signDialogOpen}
            afterRegistration={onClose}
            afterLogin={onClose}
            onClose={onClose}
        />
    </>
}