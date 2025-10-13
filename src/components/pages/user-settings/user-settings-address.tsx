import {useTranslate} from "@/src/hooks/translateHook";
import React from "react";
import {Country} from "@/src/api/openapi";
import {LayoutFlexColumn} from "../../components/layout/layout-flex-column/layout-flex-column";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {ComboBox} from "@/src/components/components/inputs/combo-box/combo-box";
import {useInit} from "@/src/hooks/lifecycleHooks";

interface IField<T> {
    name: FormDataEnum;
    value?: T;
}

interface IUserSettingsAddressProps {
    heading: string;
    country: IField<Country>;
    city: IField<string>;
    psc: IField<string>;
    street: IField<string>;
    houseNumber: IField<string>;
}

export const UserSettingsAddress = (props: IUserSettingsAddressProps) => {
    const {heading, country, city, psc, street, houseNumber} = props;
    const {t} = useTranslate("page.userSettings");
    const countryOptions = useInit(() => {
        return Object.values(Country).map(country => ({
            value: country,
            label: country
        }))
    });

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
        <Heading text={heading} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
        <ComboBox
            controlled={false}
            items={countryOptions}
            defaultValue={countryOptions.find(i => i.value === country.value)}
            id={country.name}
            name={country.name}
            placeHolder={t("country")}
            instanceId={"address_country"}
        />
        <TextBox
            controlled={false}
            name={city.name}
            id={city.name}
            type={TextBoxType.TEXT}
            placeholder={t("city")}
            defaultValue={city.value || ""}
        />
        <TextBox
            controlled={false}
            name={psc.name}
            id={psc.name}
            type={TextBoxType.TEXT}
            placeholder={t("psc")}
            defaultValue={psc.value || ""}
        />
        <TextBox
            controlled={false}
            name={street.name}
            id={street.name}
            type={TextBoxType.TEXT}
            placeholder={t("street")}
            defaultValue={street.value || ""}
        />
        <TextBox
            controlled={false}
            name={houseNumber.name}
            id={houseNumber.name}
            type={TextBoxType.TEXT}
            placeholder={t("houseNumber")}
            defaultValue={houseNumber.value || ""}
        />
    </LayoutFlexColumn>
}