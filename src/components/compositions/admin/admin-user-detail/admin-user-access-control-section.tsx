"use client"

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {UsersService} from "@/src/services/UsersService";
import {reloadPage} from "@/src/utils/common";
import {Group} from "@/src/components/compositions/admin/admin-user-detail/admin-user-detail-group";
import {AdminUserDetailResponseDto} from "@/src/api/openapi";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";

interface IAccessControlSectionProps {
    user: AdminUserDetailResponseDto;
}

export const AccessControlSection = (props: IAccessControlSectionProps) => {
    const user = UserAdminDetailConverter.toInstance(props.user);
    const text = user.isBanned ? "Unban User" : "Ban User";
    return <Group title={"Access control"}>
        <ButtonClick
            controlled={true}
            type={ButtonType.YELLOW}
            label={text}
            size={ButtonSize.BUTTON_SIZE_M}
            onClick={async () => {
                await UsersService.banUser({
                    userId: user.id,
                    ban: !user.isBanned
                })
                reloadPage();
            }}
        />
    </Group>
}