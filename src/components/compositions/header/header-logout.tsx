"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {logoutAction} from "@/src/app/actions/auth/auth";


export const HeaderLogout = () => {

    return <ButtonClick
        size={ButtonSize.BY_CONTENT}
        label={"Logout"}
        onClick={() => {
            logoutAction();
        }}
        type={ButtonType.YELLOW}
    />
};