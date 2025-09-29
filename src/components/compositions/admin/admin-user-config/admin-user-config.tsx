"use client";

import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import React from "react";
import {FlexGap} from "@/src/enums/layout.enum";
import {AdminSetUserConfig} from "@/src/components/compositions/admin/admin-set-user-config/admin-set-user-config";
import {formatDateTime} from "@/src/utils/date-time.format";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {AdminUserDetailResponseDto} from "@/src/api/openapi";

interface IAdminUserConfigHistoryProps {
    user: AdminUserDetailResponseDto;
}

export const AdminUserConfig = (props: IAdminUserConfigHistoryProps) => {
    const user = UserAdminDetailConverter.toInstance(props.user);
    const locale = useCurrentLocale();

    const renderTextItem = (name: string, value: string) => {
        return <LayoutFlexRow gap={FlexGap.TINY_8}>
            <Text text={`${name}: `} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
            <Text text={value} fontSize={FontSize.BASE_14} />
        </LayoutFlexRow>
    }

    return <LayoutFlexColumn gap={FlexGap.TINY_8}>
        {user.currentConfig && <AdminSetUserConfig userId={user.id} config={user.currentConfig} />}
        {user.previousConfigs.map((c, index) => {
            return <LayoutFlexRow gap={FlexGap.TINY_8} key={index}>
                {renderTextItem("Last Update", formatDateTime({date: c.created,locale: locale}))}
                {renderTextItem("Commission Percentage", c.tripOfferCommissionPercentage.toString())}
            </LayoutFlexRow>
        })}
    </LayoutFlexColumn>
}