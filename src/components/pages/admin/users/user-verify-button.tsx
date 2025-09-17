"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {UsersService} from "@/src/services/UsersService";
import type {AdminUserDetailResponseDto} from "@/src/api/openapi";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import {useRouter} from "@/src/i18n/navigation";

interface IUserVerifyButtonProps {
    user: AdminUserDetailResponseDto;
}

export const UserVerifyButton = (props: IUserVerifyButtonProps) => {
    const router = useRouter();
    const user = UserAdminDetailConverter.toInstance(props.user);

    return  <ButtonClick
        controlled={true}
        size={ButtonSize.BY_CONTENT}
        label={user.isVerifiedForTransporting ? "Označit USERA jako neoveřený" : "Označit USERA jako oveřený"}
        onClick={async () => {
            await UsersService.setUserVerification(user.id, !user.isVerifiedForTransporting);
            router.refresh();
        }}
        type={ButtonType.YELLOW}
    />
};