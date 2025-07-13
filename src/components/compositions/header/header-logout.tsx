"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {AuthorizationService} from "@/src/services/AuthorizationService";


export const HeaderLogout = () => {

    return <ButtonClick
        size={ButtonSize.BY_CONTENT}
        label={"Logout"}
        onClick={async () => {
            await AuthorizationService.logout();
        }}
        type={ButtonType.YELLOW}
    />
};