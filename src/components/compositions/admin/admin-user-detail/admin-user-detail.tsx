import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import React from "react";
import {UserAddress} from "@/src/data/users/userAddress";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {AdminUserConfig} from "@/src/components/compositions/admin/admin-user-config/admin-user-config";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {ButtonLink, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";
import {Group} from "@/src/components/compositions/admin/admin-user-detail/admin-user-detail-group";
import {
    AccessControlSection
} from "@/src/components/compositions/admin/admin-user-detail/admin-user-access-control-section";

interface IAdminUserDetailProps {
    user: UserAdminDetail;
    config: AppBusinessConfig;
}

export const AdminUserDetail = (props: IAdminUserDetailProps) => {
    const {user, config} = props;

    const _renderAddress = (address: UserAddress) => {
        return <>
            {renderTextItem("Address", address.street + " " + address.houseNumber)}
            {renderTextItem("PSC", address.psc)}
            {renderTextItem("City", address.city)}
            {renderTextItem("Country", address.country?.toString() || "")}
        </>
    }

    const renderTextItem = (name: string, value: string) => {
        return <LayoutFlexRow gap={FlexGap.TINY_8}>
            <Text text={`${name}: `} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
            <Text text={value} fontSize={FontSize.BASE_14} />
        </LayoutFlexRow>
    }

    return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true} justifyContent={"flex-start"} alignItems={"flex-start"}>
            <Group title={"Info"}>
                {renderTextItem("Jméno", user.userFinancialSettings.name + " " + user.userFinancialSettings.surname)}
                {renderTextItem("Email", user.email)}
                {renderTextItem("Je to firma", user.userFinancialSettings.isCompany.toString())}
                {renderTextItem("ICO", user.userFinancialSettings.ico)}
                {renderTextItem("DIC", user.userFinancialSettings.dic)}
                {renderTextItem("Telefonní číslo", user.phoneNumber)}
            </Group>
            {user.userFinancialSettings.address && <Group title={"Adresa"}>
                {_renderAddress(user.userFinancialSettings.address)}
            </Group>}
            {user.userFinancialSettings.mailingAddress && <Group title={"Mailing Address"}>
                {_renderAddress(user.userFinancialSettings.mailingAddress)}
            </Group>}
            <Group title={"Transfer Info"}>
                {renderTextItem("Iban", user.userFinancialSettings.iban)}
                {renderTextItem("Swift", user.userFinancialSettings.swift)}
            </Group>
        </LayoutFlexRow>
        <AccessControlSection user={UserAdminDetailConverter.toJson(user)} />
        {user.transportRequirementsId && <Group title={"Transport Requirements"}>
            <ButtonLink
                route={{
                    route: ROUTES.ADMIN_TRANSPORT_REQUIREMENTS,
                    params: { [URL_PARAMS.USER_ID]: user.id.toString()}
                }}
                label={"Open"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </Group>}
        <Group title={"Vehicles"}>
            {user.vehicles.reverse().map(v => {
                return <LayoutFlexRow gap={FlexGap.SMALL_16} key={v.id}>
                    <Text text={`ID: ${v.id}: ${v.name} - ${v.status}`} fontSize={FontSize.M_22} />
                    <ButtonLink
                        route={{
                            route: ROUTES.ADMIN_VEHICLE,
                            params: { [URL_PARAMS.VEHICLE_ID]: v.id.toString() }
                        }}
                        label={"Open"}
                        type={ButtonType.BLACK}
                        size={ButtonSize.BUTTON_SIZE_M}
                    />
                </LayoutFlexRow>
            })}
        </Group>
        <Group title={"Configs"}>
            <AdminUserConfig
                user={UserAdminDetailConverter.toJson(user)}
                appConfig={AppBusinessConfigConverter.toJson(config)}
            />
        </Group>
    </LayoutFlexColumn>
}