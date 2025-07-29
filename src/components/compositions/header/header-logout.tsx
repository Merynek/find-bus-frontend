"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {ROUTES} from "@/src/enums/router.enum";
import { useRouter } from "@/src/i18n/navigation";

export const HeaderLogout = () => {
    const router = useRouter();
    return <ButtonClick
        size={ButtonSize.BY_CONTENT}
        label={"Logout"}
        onClick={async () => {
            await AuthorizationService.logout();
            router.push(ROUTES.SIGN_IN);
            router.refresh();
        }}
        type={ButtonType.YELLOW}
    />
};