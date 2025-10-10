import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {UserVerifyButton} from "@/src/components/pages/admin/users/user-verify-button";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import React from "react";
import {UserAddress} from "@/src/data/users/userAddress";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {ImageElement} from "@/src/components/components/image-element/image-element";
import {Accordion} from "@/src/components/components/accordion/accordion";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {AdminUserConfig} from "@/src/components/compositions/admin/admin-user-config/admin-user-config";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {ButtonLink, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";

interface IAdminUserItemProps {
    user: UserAdminDetail;
    config: AppBusinessConfig;
}

export const AdminUserItem = (props: IAdminUserItemProps) => {
    const {user, config} = props;

    const _renderTransporterRequirements = (requirements: TransportRequirements) => {
        return <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true} justifyContent={"flex-start"} alignItems={"flex-start"}>
            {renderTextItem("ConcessionNumber", requirements.concessionNumber)}
            <LayoutFlexColumn>
                <Text text={`ConcessionDocuments: `} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                {requirements.concessionDocuments && <div>
                    <div style={{width: "200px", height: "200px", position: "relative"}}>
                        <ImageElement
                            src={requirements.concessionDocuments.path}
                            alt={""}
                            fill={true}
                        />
                    </div>
                </div>}
            </LayoutFlexColumn>
            <LayoutFlexColumn>
                <Text text={`BusinessRiskInsurance: `} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                {requirements.businessRiskInsurance && <div>
                    <div style={{width: "200px", height: "200px", position: "relative"}}>
                        <ImageElement
                            src={requirements.businessRiskInsurance.path}
                            alt={""}
                            fill={true}
                        />
                    </div>
                </div>}
            </LayoutFlexColumn>
        </LayoutFlexRow>
    }

    const _renderAddress = (address: UserAddress) => {
        return <>
            {renderTextItem("Address", address.street + " " + address.houseNumber)}
            {renderTextItem("PSC", address.psc)}
            {renderTextItem("City", address.city)}
            {renderTextItem("Country", address.country?.toString() ||"")}
        </>
    }

    const renderTextItem = (name: string, value: string) => {
        return <LayoutFlexRow gap={FlexGap.TINY_8}>
            <Text text={`${name}: `} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
            <Text text={value} fontSize={FontSize.BASE_14} />
        </LayoutFlexRow>
    }

    return <Accordion
        style={{background: "chocolate"}}
        title={<Text text={`${user.email} - ${user.isVerifiedForTransporting ? "Verified" : "NOT Verified"}`} fontSize={FontSize.M_22} fontWeight={FontWeight.SEMIBOLD} />}
        content={<LayoutFlexColumn gap={FlexGap.SMALL_16}>
            <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Group title={"Info"}>
                    {renderTextItem("Jméno", user.name + " " + user.surname)}
                    {renderTextItem("Je to firma", user.isCompany.toString())}
                    {renderTextItem("ICO", user.ico)}
                    {renderTextItem("DIC", user.dic)}
                    {renderTextItem("Telefonní číslo", user.phoneNumber)}
                </Group>
                <Group title={"Adresa"}>
                    {_renderAddress(user.address)}
                </Group>
                <Group title={"Mailing Address"}>
                    {_renderAddress(user.mailingAddress)}
                </Group>
                <Group title={"Transfer Info"}>
                    {renderTextItem("Iban", user.transferInfo.iban)}
                    {renderTextItem("Swift", user.transferInfo.swift)}
                </Group>
            </LayoutFlexRow>
            <Group title={"Transport Requirements"}>
                {_renderTransporterRequirements(user.transportRequirements)}
            </Group>
            <Group title={"Vehicles"}>
                {user.vehicles.map(v => {
                    return <LayoutFlexRow gap={FlexGap.SMALL_16} key={v.id}>
                        <Text text={`${v.name} - ${v.status}`} fontSize={FontSize.M_22} />
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
            <UserVerifyButton user={UserAdminDetailConverter.toJson(user)} />
        </LayoutFlexColumn>}
    />
}

interface IGroupProps {
    title: string;
    children: React.ReactNode;
}

const Group = (props: IGroupProps) => {
    const {title, children} = props;
    return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
        <Text text={title} fontSize={FontSize.M_22} fontWeight={FontWeight.SEMIBOLD} />
        {children}
    </LayoutFlexColumn>
}