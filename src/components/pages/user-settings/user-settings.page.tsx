"use client";

import {useTranslate} from "@/src/hooks/translateHook";
import React from "react";
import {ButtonClick, ButtonLink, ButtonSize, ButtonType} from "../../components/button/button";
import {Country, NotificationsEnum, UserRole, UserSettingsResponseDto} from "@/src/api/openapi";
import {LayoutFlexColumn} from "../../components/layout/layout-flex-column/layout-flex-column";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {userSettingsFormAction} from "@/src/server-actions/forms/userSettings/userSettingsFormAction";
import {useInit} from "@/src/hooks/lifecycleHooks";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import { CheckBox } from "../../components/inputs/check-box/check-box";
import {UserSettingsConverter} from "@/src/converters/users/user-settings-converter";
import {UserSettingsAddress} from "@/src/components/pages/user-settings/user-settings-address";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";
import {UsersService} from "@/src/services/UsersService";
import {useRouter} from "@/src/i18n/navigation";

interface IUserSettingsPageProps {
    settings: UserSettingsResponseDto;
}

const UserSettingsPage = (props: IUserSettingsPageProps) => {
    const settings = useInit(() => UserSettingsConverter.toInstance(props.settings));
    const {t} = useTranslate("page.userSettings");
    const {user} = useLoggedUser();
    const router = useRouter();
    const [state, action, pending] = useFormActionState(userSettingsFormAction, {
        data: {
            userFinancialSettings: {
                name: settings.userFinancialSettings.name,
                surname: settings.userFinancialSettings.surname,
                ico: settings.userFinancialSettings.ico,
                dic: settings.userFinancialSettings.dic,
                companyName: settings.userFinancialSettings.companyName,
                isCompany: settings.userFinancialSettings.isCompany,
                address: {
                    country: settings.userFinancialSettings.address?.country || Country.CZ,
                    city: settings.userFinancialSettings.address?.city || "",
                    psc: settings.userFinancialSettings.address?.psc || "",
                    street: settings.userFinancialSettings.address?.street || "",
                    houseNumber: settings.userFinancialSettings.address?.houseNumber || "",
                },
                mailingAddress: {
                    country: settings.userFinancialSettings.mailingAddress?.country || Country.CZ,
                    city: settings.userFinancialSettings.mailingAddress?.city || "",
                    psc: settings.userFinancialSettings.mailingAddress?.psc || "",
                    street: settings.userFinancialSettings.mailingAddress?.street || "",
                    houseNumber: settings.userFinancialSettings.mailingAddress?.houseNumber || ""
                },
                swift: settings.userFinancialSettings.swift,
                iban: settings.userFinancialSettings.iban
            },
            phoneNumber: settings.phoneNumber,
            notifications: settings.notifications
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
                defaultValue={state?.data?.userFinancialSettings?.name || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.surname}
                id={FormDataEnum.surname}
                type={TextBoxType.TEXT}
                placeholder={t("surname")}
                defaultValue={state?.data?.userFinancialSettings?.surname || ""}
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
                defaultValue={state?.data?.userFinancialSettings?.ico || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.dic}
                id={FormDataEnum.dic}
                type={TextBoxType.TEXT}
                placeholder={t("dic")}
                defaultValue={state?.data?.userFinancialSettings?.dic || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.companyName}
                id={FormDataEnum.companyName}
                type={TextBoxType.TEXT}
                placeholder={t("companyName")}
                defaultValue={state?.data?.userFinancialSettings?.companyName || ""}
            />
            <CheckBox
                controlled={false}
                name={FormDataEnum.isCompany}
                id={FormDataEnum.isCompany}
                label={t("isCompany")}
                defaultChecked={state?.data?.userFinancialSettings?.isCompany || false}
            />
        </>
    }

    const renderAddress = () => {
        return <UserSettingsAddress
            heading={t("addressHeading")}
            city={{
                name: FormDataEnum.address_city,
                value: state?.data?.userFinancialSettings?.address?.city
            }}
            psc={{
                name: FormDataEnum.address_psc,
                value: state?.data?.userFinancialSettings?.address?.psc
            }}
            street={{
                name: FormDataEnum.address_street,
                value: state?.data?.userFinancialSettings?.address?.street
            }}
            houseNumber={{
                name: FormDataEnum.address_houseNumber,
                value: state?.data?.userFinancialSettings?.address?.houseNumber
            }}
            country={{
                name: FormDataEnum.address_country,
                value: state?.data?.userFinancialSettings?.address?.country
            }}
        />
    }

    const renderMailingAddress = () => {
        return <UserSettingsAddress
            heading={t("addressHeading")}
            city={{
                name: FormDataEnum.mailingAddress_city,
                value: state?.data?.userFinancialSettings?.mailingAddress?.city
            }}
            psc={{
                name: FormDataEnum.mailingAddress_psc,
                value: state?.data?.userFinancialSettings?.mailingAddress?.psc
            }}
            street={{
                name: FormDataEnum.mailingAddress_street,
                value: state?.data?.userFinancialSettings?.mailingAddress?.street
            }}
            houseNumber={{
                name: FormDataEnum.mailingAddress_houseNumber,
                value: state?.data?.userFinancialSettings?.mailingAddress?.houseNumber
            }}
            country={{
                name: FormDataEnum.mailingAddress_country,
                value: state?.data?.userFinancialSettings?.mailingAddress?.country
            }}
        />
    }

    const renderNotifications = () => {
        return <>
            <Heading text={t("notificationsHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            {allNotifications().map((option) => {
                const notifications = state?.data?.notifications || [];
                return <CheckBox
                    controlled={false}
                    name={FormDataEnum.notifications}
                    id={`${FormDataEnum.notifications}-${option}`}
                    label={option}
                    value={option}
                    defaultChecked={notifications.includes(option)}
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
                name={FormDataEnum.iban}
                id={FormDataEnum.iban}
                type={TextBoxType.TEXT}
                placeholder={t("iban")}
                defaultValue={state?.data?.userFinancialSettings?.iban || ""}
            />
            <TextBox
                controlled={false}
                name={FormDataEnum.swift}
                id={FormDataEnum.swift}
                type={TextBoxType.TEXT}
                placeholder={t("swift")}
                defaultValue={state?.data?.userFinancialSettings?.swift || ""}
            />
        </>
    }

    const renderTransportRequirements = () => {
        if (settings.transportRequirementsId) {
            return <ButtonLink
                route={{
                    route: ROUTES.TRANSPORT_REQUIREMENTS
                }}
                label={t("transportRequirements")}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }

        return <ButtonClick
            controlled={true}
            onClick={async () => {
                await UsersService.updateTransportRequirements({
                    concessionNumber: ""
                })
                router.push({
                    pathname: ROUTES.TRANSPORT_REQUIREMENTS
                })
            }}
            label={t("transportRequirements")}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
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