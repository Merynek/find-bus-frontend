import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import React from "react";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";
import {ButtonLink, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {UserAdminItem} from "@/src/data/users/user-admin-item";

interface IAdminUserItemProps {
    user: UserAdminItem;
}

export const AdminUserItem = (props: IAdminUserItemProps) => {
    const {user} = props;

    return <LayoutFlexRow gap={FlexGap.TINY_8}>
        <Text text={user.email} fontSize={FontSize.M_22} fontWeight={FontWeight.SEMIBOLD} />
        <ButtonLink
            route={{
                route: ROUTES.ADMIN_USER,
                params: { [URL_PARAMS.USER_ID]: user.id.toString()}
            }}
            label={"User Detail"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </LayoutFlexRow>
}