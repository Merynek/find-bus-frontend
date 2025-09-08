"use client";

import {useTranslate} from "@/src/hooks/translateHook";
import React from "react";
import styles from "./user-settings.page.module.scss";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {Country, NotificationsEnum, UserRole, UserSettingsResponseDto} from "@/src/api/openapi";
import {LayoutFlexColumn} from "../../components/layout/layout-flex-column/layout-flex-column";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {userSettingsFormAction} from "@/src/app/actions/forms/userSettings/userSettingsFormAction";
import {useInit} from "@/src/hooks/lifecycleHooks";
import {UsersConverter} from "@/src/converters/users/users-converter";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import { CheckBox } from "../../components/inputs/check-box/check-box";

interface IUserSettingsPageProps {
    settings: UserSettingsResponseDto;
}

const UserSettingsPage = (props: IUserSettingsPageProps) => {
    const settings = useInit(() => UsersConverter.userSettingsToInstance(props.settings));
    const {t} = useTranslate("page.userSettings");
    const {user} = useLoggedUser();
    const [state, action, pending] = useFormActionState(userSettingsFormAction, {
        data: {
            name: settings.name,
            surname: settings.surname,
            phoneNumber: settings.phoneNumber,
            ico: settings.ico,
            dic: settings.dic,
            companyName: settings.companyName,
            isCompany: settings.isCompany,
            notifications: settings.notifications,
            address: {
                country: settings.address.country || undefined,
                city: settings.address.city,
                psc: settings.address.psc,
                street: settings.address.street,
                houseNumber: settings.address.houseNumber,
            },
            mailingAddress: {
                country: settings.mailingAddress.country || undefined,
                city: settings.mailingAddress.city,
                psc: settings.mailingAddress.psc,
                street: settings.mailingAddress.street,
                houseNumber: settings.mailingAddress.houseNumber
            },
            concessionNumber: settings.transportRequirements.concessionNumber,
            transferInfo: {
                iban: settings.transferInfo.iban,
                swift: settings.transferInfo.swift
            }
        }
    })

    const allNotifications = (): NotificationsEnum[] => {
        return Object.values(NotificationsEnum).map(key => {
            return key;
        })
    }

    const renderBaseInfo = () => {
        return <>
            <TextBox
                controlled={false}
                name={FormDataEnum.name}
                id={FormDataEnum.name}
                type={TextBoxType.TEXT}
                placeholder={t("name")}
                defaultValue={state?.data?.name || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.surname}
                id={FormDataEnum.surname}
                type={TextBoxType.TEXT}
                placeholder={t("surname")}
                defaultValue={state?.data?.surname || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.phoneNumber}
                id={FormDataEnum.phoneNumber}
                type={TextBoxType.TEL}
                placeholder={t("phoneNumber")}
                defaultValue={state?.data?.phoneNumber || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.ico}
                id={FormDataEnum.ico}
                type={TextBoxType.TEXT}
                placeholder={t("ico")}
                defaultValue={state?.data?.ico || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.dic}
                id={FormDataEnum.dic}
                type={TextBoxType.TEXT}
                placeholder={t("dic")}
                defaultValue={state?.data?.dic || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.companyName}
                id={FormDataEnum.companyName}
                type={TextBoxType.TEXT}
                placeholder={t("companyName")}
                defaultValue={state?.data?.companyName || ""}
            />
            <CheckBox
                controlled={false}
                name={FormDataEnum.isCompany}
                id={FormDataEnum.isCompany}
                label={t("isCompany")}
                defaultValue={state?.data?.isCompany || false}
            />
        </>
    }

    const renderAddress = () => {
        return <>
            <div>
                <label htmlFor={FormDataEnum.address_country}>Země</label>
                <select
                    id={FormDataEnum.address_country}
                    name={FormDataEnum.address_country}
                    defaultValue={state?.data?.address?.country}
                    key={state?.data?.address?.country}
                >
                    <option value="">- Vyberte zemi -</option>
                    {Object.values(Country).map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <TextBox
                controlled={false}
                name={FormDataEnum.address_city}
                id={FormDataEnum.address_city}
                type={TextBoxType.TEXT}
                placeholder={t("city")}
                defaultValue={state?.data?.address?.city || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.address_psc}
                id={FormDataEnum.address_psc}
                type={TextBoxType.TEXT}
                placeholder={t("psc")}
                defaultValue={state?.data?.address?.psc || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.address_street}
                id={FormDataEnum.address_street}
                type={TextBoxType.TEXT}
                placeholder={t("street")}
                defaultValue={state?.data?.address?.street || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.address_houseNumber}
                id={FormDataEnum.address_houseNumber}
                type={TextBoxType.TEXT}
                placeholder={t("houseNumber")}
                defaultValue={state?.data?.address?.houseNumber || ""}
            />
        </>
    }

    const renderMailingAddress = () => {
        return <>
            <div>
                <label htmlFor={FormDataEnum.mailingAddress_country}>Země</label>
                <select
                    id={FormDataEnum.mailingAddress_country}
                    name={FormDataEnum.mailingAddress_country}
                    defaultValue={state?.data?.mailingAddress?.country}
                    key={state?.data?.mailingAddress?.country}
                >
                    <option value="">- Vyberte zemi -</option>
                    {Object.values(Country).map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <TextBox
                controlled={false}
                name={FormDataEnum.mailingAddress_city}
                id={FormDataEnum.mailingAddress_city}
                type={TextBoxType.TEXT}
                placeholder={t("city")}
                defaultValue={state?.data?.mailingAddress?.city || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.mailingAddress_psc}
                id={FormDataEnum.mailingAddress_psc}
                type={TextBoxType.TEXT}
                placeholder={t("psc")}
                defaultValue={state?.data?.mailingAddress?.psc || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.mailingAddress_street}
                id={FormDataEnum.mailingAddress_street}
                type={TextBoxType.TEXT}
                placeholder={t("street")}
                defaultValue={state?.data?.mailingAddress?.street || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.mailingAddress_houseNumber}
                id={FormDataEnum.mailingAddress_houseNumber}
                type={TextBoxType.TEXT}
                placeholder={t("houseNumber")}
                defaultValue={state?.data?.mailingAddress?.houseNumber || ""}
            />
        </>
    }

    const renderNotifications = () => {
        return <>
            <Heading text={t("notificationsHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            {allNotifications().map((option) => {
                const notifications = state?.data?.notifications || [];
                return <CheckBox
                    controlled={false}
                    name={FormDataEnum.notifications}
                    id={FormDataEnum.notifications}
                    label={option}
                    defaultValue={notifications.includes(option)}
                    key={option}
                />
            })}
        </>
    }

    const renderBankInfo = () => {
        return <>
            <Heading text={t("bankInfoHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <TextBox
                controlled={false}
                name={FormDataEnum.transferInfo_iban}
                id={FormDataEnum.transferInfo_iban}
                type={TextBoxType.TEXT}
                placeholder={t("iban")}
                defaultValue={state?.data?.transferInfo?.iban || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.transferInfo_swift}
                id={FormDataEnum.transferInfo_swift}
                type={TextBoxType.TEXT}
                placeholder={t("swift")}
                defaultValue={state?.data?.transferInfo?.swift || ""}
            />
        </>
    }

    const renderTransportRequirements = () => {
        return <>
            <Heading text={t("transportRequirementsHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <span>{"User => " + (settings.isVerifiedForTransporting ? t("verifiedForTransporting") : t("notVerifiedForTransporting"))}</span>
            <TextBox
                controlled={false}
                name={FormDataEnum.concessionNumber}
                id={FormDataEnum.concessionNumber}
                type={TextBoxType.TEXT}
                placeholder={t("concessionNumber")}
                defaultValue={state?.data?.concessionNumber || ""}
            />
            <ImageUploader
                label={t("businessRiskInsurance")}
                inputName={FormDataEnum.businessRiskInsurance}
                initialImage={settings.transportRequirements.businessRiskInsurance?.path}
            />
            <ImageUploader
                label={t("concessionDocuments")}
                inputName={FormDataEnum.concessionDocuments}
                initialImage={settings.transportRequirements.concessionDocuments?.path}
            />
        </>
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("userSettingsHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <form action={action}>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state}/>
                <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                    {renderBaseInfo()}
                    {renderAddress()}
                    {renderMailingAddress()}
                    {renderNotifications()}
                    {user?.role === UserRole.TRANSPORTER && renderBankInfo()}
                    {user?.role === UserRole.TRANSPORTER && renderTransportRequirements()}
                </LayoutFlexColumn>
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    isDisabled={pending}
                    label={t("saveButton")}
                />
            </LayoutFlexColumn>
        </form>
    </LayoutFlexColumn>
};

export default UserSettingsPage;