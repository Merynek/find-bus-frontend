"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {UsersService} from "@/src/services/UsersService";
import type {AdminUserDetailResponseDto} from "@/src/api/openapi";
import {useInit} from "@/src/hooks/lifecycleHooks";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";

interface IUserVerifyButtonProps {
    user: AdminUserDetailResponseDto;
}

export const UserVerifyButton = (props: IUserVerifyButtonProps) => {
    const user = useInit(() => UserAdminDetailConverter.toInstance(props.user));

    return  <ButtonClick
        controlled={true}
        size={ButtonSize.BY_CONTENT}
        label={user.isVerifiedForTransporting ? "Označit USERA jako neoveřený" : "Označit USERA jako oveřený"}
        onClick={async () => {
            await UsersService.setUserVerification(user.id, !user.isVerifiedForTransporting);
        }}
        type={ButtonType.YELLOW}
    />
};