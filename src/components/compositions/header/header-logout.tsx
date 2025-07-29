"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";

export const HeaderLogout = () => {

    return <ButtonClick
        size={ButtonSize.BY_CONTENT}
        label={"Logout"}
        onClick={async () => {
            await AuthorizationService.logout();
            redirect(ROUTES.SIGN_IN);
        }}
        type={ButtonType.YELLOW}
    />
};