"use client";

import {useTranslate} from "@/src/hooks/translateHook";
import React, {useActionState, useRef} from "react";
import styles from "./user-settings.page.module.scss";
import {UserSettingsPageStore} from "./user-settings.page.store";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {Country, NotificationsEnum, UserRole, UserSettingsResponseDto} from "@/src/api/openapi";
import {LayoutFlexColumn} from "../../components/layout/layout-flex-column/layout-flex-column";
import {useAuth} from "@/src/app/contexts/AuthContext";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {userSettingsFormAction} from "@/src/app/actions/forms/userSettings/userSettingsFormAction";
import {useInit} from "@/src/hooks/lifecycleHooks";
import {UsersConverter} from "@/src/converters/users/users-converter";

interface IUserSettingsPageProps {
    settings: UserSettingsResponseDto;
}

const UserSettingsPage = (props: IUserSettingsPageProps) => {
    const settings = useInit(() => UsersConverter.userSettingsToInstance(props.settings));
    const {t} = useTranslate("page.userSettings");
    const {user} = useAuth();
    const [state, action, pending] = useActionState(userSettingsFormAction, undefined)
    const _storeRef = useRef<UserSettingsPageStore>(new UserSettingsPageStore());
    const store = _storeRef.current;

    const allNotifications = (): NotificationsEnum[] => {
        return Object.values(NotificationsEnum).map(key => {
            return key;
        })
    }

    return settings ? <div className={styles.layout}>
            <form action={action}>
                <div>
                    <label htmlFor={FormDataEnum.name}>Name</label>
                    <input id={FormDataEnum.name} name={FormDataEnum.name} type={"text"} placeholder="Name"/>
                </div>
                {state?.errors?.name && <p>{state.errors.name}</p>}
                <div>
                    <label htmlFor={FormDataEnum.surname}>Surname</label>
                    <input id={FormDataEnum.surname} name={FormDataEnum.surname} type={"text"} placeholder="Surname"/>
                </div>
                {state?.errors?.surname && <p>{state.errors.surname}</p>}
                <div>
                    <label htmlFor={FormDataEnum.phoneNumber}>PhoneNumber</label>
                    <input id={FormDataEnum.phoneNumber} name={FormDataEnum.phoneNumber} type={"tel"}
                           placeholder="PhoneNumber"/>
                </div>
                {state?.errors?.phoneNumber && <p>{state.errors.phoneNumber}</p>}

                <div>
                    <label htmlFor={FormDataEnum.ico}>PhoneNumber</label>
                    <input id={FormDataEnum.ico} name={FormDataEnum.ico} type={"text"} placeholder="Ico"/>
                </div>
                {state?.errors?.ico && <p>{state.errors.ico}</p>}

                <div>
                    <label htmlFor={FormDataEnum.dic}>PhoneNumber</label>
                    <input id={FormDataEnum.dic} name={FormDataEnum.dic} type={"text"} placeholder="Dic"/>
                </div>
                {state?.errors?.dic && <p>{state.errors.dic}</p>}

                <div>
                    <label htmlFor={FormDataEnum.companyName}>PhoneNumber</label>
                    <input id={FormDataEnum.companyName} name={FormDataEnum.companyName} type={"text"}
                           placeholder="CompanyName"/>
                </div>
                {state?.errors?.companyName && <p>{state.errors.companyName}</p>}
                <h2>Jsi firma?:</h2>
                <div>
                    <label htmlFor={FormDataEnum.isCompany}>isCompany</label>
                    <input
                        id={FormDataEnum.isCompany}
                        name={FormDataEnum.isCompany}
                        type={"checkbox"}
                        placeholder="isCompany"
                    />
                </div>

                <AddressFormSection
                    prefix="address"
                    title="Adresa"
                    defaultValues={{
                        country: settings.address.country || Country.CZ,
                        city: settings.address.city,
                        psc: settings.address.psc,
                        street: settings.address.street,
                        houseNumber: settings.address.houseNumber,
                    }}
                />

                <AddressFormSection
                    prefix="mailingAddress"
                    title="Korespondenční adresa"
                    defaultValues={{
                        country: settings.mailingAddress.country || Country.CZ,
                        city: settings.mailingAddress.city,
                        psc: settings.mailingAddress.psc,
                        street: settings.mailingAddress.street,
                        houseNumber: settings.mailingAddress.houseNumber,
                    }}
                />

                <h2>Notifications</h2>
                <fieldset>
                    <legend className="text-sm font-medium text-gray-700">Notifikace</legend>
                    <div className="mt-2 space-y-2">
                        {allNotifications().map((option) => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    name="notifications"
                                    value={option}
                                    defaultChecked={settings.notifications.includes(option)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
                {user?.role === UserRole.TRANSPORTER && <>
                    <h2>Bankovní udaje</h2>
                    <LayoutFlexColumn>
                        <div>
                            <label htmlFor={FormDataEnum.iban}>iban</label>
                            <input id={FormDataEnum.iban} name={FormDataEnum.iban} type={"text"} placeholder="Iban"/>
                        </div>
                        {state?.errors?.iban && <p>{state.errors.iban}</p>}
                        <div>
                            <label htmlFor={FormDataEnum.swift}>swift</label>
                            <input id={FormDataEnum.swift} name={FormDataEnum.swift} type={"text"} placeholder="swift"/>
                        </div>
                        {state?.errors?.swift && <p>{state.errors.swift}</p>}
                    </LayoutFlexColumn>
                </>}
                {user?.role === UserRole.TRANSPORTER && <>
                    <h2>Požadavky na transportera</h2>
                    <LayoutFlexColumn>
                        <LayoutFlexColumn>
                            <span>{"User => " + (store.userSettings?.isVerifiedForTransporting ? "Verified" : "Not Verified")}</span>
                        </LayoutFlexColumn>
                        <div>
                            <label htmlFor={FormDataEnum.concessionNumber}>swift</label>
                            <input id={FormDataEnum.concessionNumber} name={FormDataEnum.concessionNumber} type={"text"}
                                   placeholder="concessionNumber"/>
                        </div>
                    </LayoutFlexColumn>
                    <fieldset className="space-y-4">
                        <legend className="text-sm font-medium text-gray-700">Dokumenty</legend>

                        {/* Pojištění podnikatelských rizik */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Pojištění podnikatelských rizik
                            </label>
                            <input
                                type="file"
                                name={FormDataEnum.businessRiskInsurance}
                                accept=".jpg,.jpeg,.png,.webp"
                                className="mt-1 block w-full"
                            />
                            {state?.errors?.businessRiskInsurance && (
                                <p className="text-sm text-red-600 mt-1">{state.errors.businessRiskInsurance}</p>
                            )}
                        </div>

                        {/* Koncesní listina */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Koncesní listina</label>
                            <input
                                type="file"
                                name={FormDataEnum.concessionDocuments}
                                accept=".jpg,.jpeg,.png,.webp"
                                className="mt-1 block w-full"
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
        :
        <div>LOADER</div>

};

export default UserSettingsPage;

type AddressFormSectionProps = {
    prefix: 'address' | 'mailingAddress';
    defaultValues?: Partial<{
        country: string;
        city: string;
        psc: string;
        street: string;
        houseNumber: string;
    }>;
    title?: string;
};

function AddressFormSection({prefix, defaultValues = {}, title}: AddressFormSectionProps) {
    return (
        <fieldset className="space-y-2">
            {title && <legend className="text-sm font-medium text-gray-700">{title}</legend>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Země</label>
                    <input
                        type="text"
                        name={`${prefix}.country`}
                        defaultValue={defaultValues.country ?? ''}
                        className="mt-1 w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Město</label>
                    <input
                        type="text"
                        name={`${prefix}.city`}
                        defaultValue={defaultValues.city ?? ''}
                        className="mt-1 w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">PSČ</label>
                    <input
                        type="text"
                        name={`${prefix}.psc`}
                        defaultValue={defaultValues.psc ?? ''}
                        className="mt-1 w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ulice</label>
                    <input
                        type="text"
                        name={`${prefix}.street`}
                        defaultValue={defaultValues.street ?? ''}
                        className="mt-1 w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Číslo popisné</label>
                    <input
                        type="text"
                        name={`${prefix}.houseNumber`}
                        defaultValue={defaultValues.houseNumber ?? ''}
                        className="mt-1 w-full border rounded px-3 py-2"
                    />
                </div>
            </div>
        </fieldset>
    );
}