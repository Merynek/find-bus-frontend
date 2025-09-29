import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {VehicleDetail} from "@/src/components/compositions/vehicle/detail-list/vehicle-detail-list";
import {VehicleVerifyButton} from "@/src/components/pages/admin/users/vehicle-verify-button";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
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

interface IAdminUserItemProps {
    user: UserAdminDetail;
}

export const AdminUserItem = (props: IAdminUserItemProps) => {
    const {user} = props;

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
        style={{background: "gray"}}
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
                    return <Accordion
                        style={{background: "orange"}}
                        key={v.id}
                        title={`${v.name} - ${v.isVerifiedForTransporting ? "Verified" : "NOT Verified"}`}
                        content={<LayoutFlexColumn gap={FlexGap.SMALL_16}>
                            <VehicleDetail vehicle={v} />
                            <VehicleVerifyButton vehicle={VehicleConverter.toJson(v)} />
                        </LayoutFlexColumn>}
                    />
                })}
            </Group>
            <Group title={"Configs"}>
                <AdminUserConfig user={UserAdminDetailConverter.toJson(user)} />
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
    return <LayoutFlexColumn>
        <Text text={title} fontSize={FontSize.M_22} fontWeight={FontWeight.SEMIBOLD} />
        {children}
    </LayoutFlexColumn>
}