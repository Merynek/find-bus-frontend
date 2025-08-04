"use client";

import {useTranslate} from "@/src/hooks/translateHook";
import React, {useActionState} from "react";
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

interface IUserSettingsPageProps {
    settings: UserSettingsResponseDto;
}

const UserSettingsPage = (props: IUserSettingsPageProps) => {
    const settings = useInit(() => UsersConverter.userSettingsToInstance(props.settings));
    const {t} = useTranslate("page.userSettings");
    const {user} = useLoggedUser();
    const [state, action, pending] = useActionState(userSettingsFormAction, undefined);

    const allNotifications = (): NotificationsEnum[] => {
        return Object.values(NotificationsEnum).map(key => {
            return key;
        })
    }

    return <div className={styles.layout}>
        <form action={action}>
            <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-gray-700">Obecné</legend>
                <div>
                    <label htmlFor={FormDataEnum.name}>Name</label>
                    <input id={FormDataEnum.name} name={FormDataEnum.name} type={"text"} placeholder="Name"
                           defaultValue={state?.data?.name || settings.name}/>
                </div>
                {state?.errors?.name && <p>{state.errors.name}</p>}
                <div>
                    <label htmlFor={FormDataEnum.surname}>Surname</label>
                    <input id={FormDataEnum.surname} name={FormDataEnum.surname} type={"text"} placeholder="Surname"
                           defaultValue={state?.data?.surname || settings.surname}/>
                </div>
                {state?.errors?.surname && <p>{state.errors.surname}</p>}
                <div>
                    <label htmlFor={FormDataEnum.phoneNumber}>PhoneNumber</label>
                    <input id={FormDataEnum.phoneNumber} name={FormDataEnum.phoneNumber} type={"tel"}
                           defaultValue={state?.data?.phoneNumber || settings.phoneNumber}
                           placeholder="PhoneNumber"/>
                </div>
                {state?.errors?.phoneNumber && <p>{state.errors.phoneNumber}</p>}

                <div>
                    <label htmlFor={FormDataEnum.ico}>ico</label>
                    <input id={FormDataEnum.ico} name={FormDataEnum.ico} type={"text"} placeholder="Ico"
                           defaultValue={state?.data?.ico || settings.ico}/>
                </div>
                {state?.errors?.ico && <p>{state.errors.ico}</p>}

                <div>
                    <label htmlFor={FormDataEnum.dic}>dic</label>
                    <input id={FormDataEnum.dic} name={FormDataEnum.dic} type={"text"} placeholder="Dic"
                           defaultValue={state?.data?.dic || settings.dic}/>
                </div>
                {state?.errors?.dic && <p>{state.errors.dic}</p>}

                <div>
                    <label htmlFor={FormDataEnum.companyName}>companyName</label>
                    <input id={FormDataEnum.companyName} name={FormDataEnum.companyName} type={"text"}
                           placeholder="CompanyName" defaultValue={state?.data?.companyName || settings.companyName}/>
                </div>
                {state?.errors?.companyName && <p>{state.errors.companyName}</p>}
            </fieldset>
                <h2>Jsi firma?:</h2>
                <div>
                    <label htmlFor={FormDataEnum.isCompany}>isCompany</label>
                    <input
                        id={FormDataEnum.isCompany}
                        name={FormDataEnum.isCompany}
                        type={"checkbox"}
                        placeholder="isCompany"
                        defaultChecked={state?.data?.isCompany || settings.isCompany}
                    />
                </div>

                <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-gray-700">Adresa</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Země</label>
                            <input
                                type="text"
                                name={FormDataEnum.address_country}
                                defaultValue={state?.data?.address?.country || settings.address.country || Country.CZ}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Město</label>
                            <input
                                type="text"
                                name={FormDataEnum.address_city}
                                defaultValue={state?.data?.address?.city || settings.address.city}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">PSČ</label>
                            <input
                                type="text"
                                name={FormDataEnum.address_psc}
                                defaultValue={state?.data?.address?.psc || settings.address.psc}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ulice</label>
                            <input
                                type="text"
                                name={FormDataEnum.address_street}
                                defaultValue={state?.data?.address?.street || settings.address.street}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Číslo popisné</label>
                            <input
                                type="text"
                                name={FormDataEnum.address_houseNumber}
                                defaultValue={state?.data?.address?.houseNumber || settings.address.houseNumber}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-gray-700">Poštovní Adresa</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Země</label>
                            <input
                                type="text"
                                name={FormDataEnum.mailingAddress_country}
                                defaultValue={state?.data?.mailingAddress?.country || settings.mailingAddress.country || Country.CZ}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Město</label>
                            <input
                                type="text"
                                name={FormDataEnum.mailingAddress_city}
                                defaultValue={state?.data?.mailingAddress?.city || settings.mailingAddress.city}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">PSČ</label>
                            <input
                                type="text"
                                name={FormDataEnum.mailingAddress_psc}
                                defaultValue={state?.data?.mailingAddress?.psc || settings.mailingAddress.psc}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ulice</label>
                            <input
                                type="text"
                                name={FormDataEnum.mailingAddress_street}
                                defaultValue={state?.data?.mailingAddress?.street || settings.mailingAddress.street}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Číslo popisné</label>
                            <input
                                type="text"
                                name={FormDataEnum.mailingAddress_houseNumber}
                                defaultValue={state?.data?.mailingAddress?.houseNumber || settings.mailingAddress.houseNumber}
                            />
                        </div>
                    </div>
                </fieldset>

                <h2>Notifications</h2>
                <fieldset>
                    <legend className="text-sm font-medium text-gray-700">Notifikace</legend>
                    <div className="mt-2 space-y-2">
                        {allNotifications().map((option) => {
                            const notifications = state?.data?.notifications || settings.notifications;
                            return <label key={option}>
                                <input
                                    type="checkbox"
                                    name="notifications"
                                    value={option}
                                    defaultChecked={notifications.includes(option)}
                                />
                                <span>{option}</span>
                            </label>
                        })}
                    </div>
                </fieldset>
                {user?.role === UserRole.TRANSPORTER && <>
                    <h2>Bankovní udaje</h2>
                    <LayoutFlexColumn>
                        <div>
                            <label htmlFor={FormDataEnum.iban}>iban</label>
                            <input id={FormDataEnum.iban} name={FormDataEnum.iban} type={"text"} placeholder="Iban"
                                   defaultValue={state?.data?.iban || settings.transferInfo.iban}/>
                        </div>
                        {state?.errors?.iban && <p>{state.errors.iban}</p>}
                        <div>
                            <label htmlFor={FormDataEnum.swift}>swift</label>
                            <input id={FormDataEnum.swift} name={FormDataEnum.swift} type={"text"} placeholder="swift"
                                   defaultValue={state?.data?.swift || settings.transferInfo.swift}/>
                        </div>
                        {state?.errors?.swift && <p>{state.errors.swift}</p>}
                    </LayoutFlexColumn>
                </>}
                {user?.role === UserRole.TRANSPORTER && <>
                    <h2>Požadavky na transportera</h2>
                    <LayoutFlexColumn>
                        <LayoutFlexColumn>
                            <span>{"User => " + (settings.isVerifiedForTransporting ? "Verified" : "Not Verified")}</span>
                        </LayoutFlexColumn>
                        <div>
                            <label htmlFor={FormDataEnum.concessionNumber}>concessionNumber</label>
                            <input id={FormDataEnum.concessionNumber} name={FormDataEnum.concessionNumber} type={"text"}
                                   placeholder="concessionNumber"
                                   defaultValue={state?.data?.concessionNumber || settings.transportRequirements.concessionNumber}/>
                        </div>
                    </LayoutFlexColumn>
                    <fieldset className="space-y-4">
                        <legend className="text-sm font-medium text-gray-700">Dokumenty</legend>
                        <div>
                            <ImageUploader
                                label={"Pojištění podnikatelských rizik"}
                                inputName={FormDataEnum.businessRiskInsurance}
                                initialImage={settings.transportRequirements.businessRiskInsurance?.path}
                            />
                            {state?.errors?.businessRiskInsurance && (
                                <p className="text-sm text-red-600 mt-1">{state.errors.businessRiskInsurance}</p>
                            )}
                        </div>
                        <div>
                            <ImageUploader
                                label={"Koncesní listina"}
                                inputName={FormDataEnum.concessionDocuments}
                                initialImage={settings.transportRequirements.concessionDocuments?.path}
                            />
                            {state?.errors?.concessionDocuments && (
                                <p className="text-sm text-red-600 mt-1">{state.errors.concessionDocuments}</p>
                            )}
                        </div>
                    </fieldset>

                </>}
                <ButtonClick
                    size={ButtonSize.BUTTON_SIZE_M}
                    onClick={() => {
                    }}
                    type={ButtonType.BLACK}
                    label={t("save")}
                />
        </form>
    </div>

};

export default UserSettingsPage;