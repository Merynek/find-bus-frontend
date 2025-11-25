"use client";

import React from "react";
import {appConfigFormAction} from "@/src/server-actions/forms/admin/appConfig/appConfigFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {AppBusinessConfigResponseDto} from "@/src/api/openapi";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Text} from "@/src/components/components/texts/text";
import {Heading} from "@/src/components/components/texts/heading";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";

interface IAppConfigPageProps {
    cfg: AppBusinessConfigResponseDto;
}

const AppConfigPage = (props: IAppConfigPageProps) => {
    const cfg = AppBusinessConfigConverter.toInstance(props.cfg);
    const appConfig = AppBusinessConfigConverter.toInstance(cfg);
    const [state, action, pending] = useFormActionState(appConfigFormAction, {
        data: {
            minEndOrderFromNowInHours: appConfig.minEndOrderFromNowInHours,
            minDateToAcceptOfferInHours: appConfig.minDateToAcceptOfferInHours,
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: appConfig.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours,
            minDiffBetweenStartTripAndEndOrderInHours: appConfig.minDiffBetweenStartTripAndEndOrderInHours,
            payRestOfPriceWarningBeforeStartTripInHours: appConfig.payRestOfPriceWarningBeforeStartTripInHours,
            payInvoiceWarningAfterAcceptOfferInHours: appConfig.payInvoiceWarningAfterAcceptOfferInHours,
            tripDepositInPercentage: appConfig.tripDepositInPercentage,
            tripCancelFeePercentageForDemander: appConfig.tripCancelFeePercentageForDemander,
            tripCancelFeeAfterLimitPercentageForDemander: appConfig.tripCancelFeeAfterLimitPercentageForDemander,
            tripOfferCommissionPercentage: appConfig.tripOfferCommissionPercentage,
            tripCancelPenaltyPercentageForTransporterFromCompany: appConfig.tripCancelPenaltyPercentageForTransporterFromCompany,
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: appConfig.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany,
            tripCancelPenaltyPercentageForTransporterFromDemander: appConfig.tripCancelPenaltyPercentageForTransporterFromDemander,
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: appConfig.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander,
            tripCancelPenaltyLimitInDays: appConfig.tripCancelPenaltyLimitInDays,
            tripCancelPenaltyAfterLimitPercentageForTransporter: appConfig.tripCancelPenaltyAfterLimitPercentageForTransporter
        }
    })

    return <LayoutFlexColumn>
        <form action={action}>
            <FormStatus state={state} locKey={"admin."} />
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <Heading text={"Create Trip"} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
                <AppConfigItem
                    text={"minEndOrderFromNowInHours (Minimální datum vytvoření aukce od teď (24 hodin))"}
                    node={<NumberBox
                        placeholder={"minEndOrderFromNowInHours"}
                        controlled={false}
                        id={FormDataEnum.minEndOrderFromNowInHours}
                        name={FormDataEnum.minEndOrderFromNowInHours}
                        defaultValue={state?.data?.minEndOrderFromNowInHours || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"minDiffBetweenStartTripAndEndOrderInHours (Minimální rozdíl hodin konce aukce a odjezdem (480 hodin = 20 dní)"}
                    node={<NumberBox
                        placeholder={"minDiffBetweenStartTripAndEndOrderInHours"}
                        controlled={false}
                        id={FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours}
                        name={FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours}
                        defaultValue={state?.data?.minDiffBetweenStartTripAndEndOrderInHours || 0}
                        minValue={0}
                    />}
                />
                <Heading text={"Trip Offers"} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
                <AppConfigItem
                    text={"minDateToAcceptOfferInHours (Jak dlouho má uživatel přijmout nabídku po té co aukce skončila a nic si zatím nevybral (24 hodin))"}
                    node={<NumberBox
                        placeholder={"minDateToAcceptOfferInHours"}
                        controlled={false}
                        id={FormDataEnum.minDateToAcceptOfferInHours}
                        name={FormDataEnum.minDateToAcceptOfferInHours}
                        defaultValue={state?.data?.minDateToAcceptOfferInHours || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours (Minimální rozdíl hodin konce aukce a odjezdem pro zobrazení všech method zaplacení (600 hodin = 25 dní))"}
                    node={<NumberBox
                        placeholder={"minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours"}
                        controlled={false}
                        id={FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                        name={FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                        defaultValue={state?.data?.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours || 0}
                        minValue={0}
                    />}
                />
                <Heading text={"Notifications"} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
                <AppConfigItem
                    text={"payRestOfPriceWarningBeforeStartTripInHours (Pouze pro doplatek 75%) - Kolik hodin před zařátkem tripu máme posilat warning email Doplatek (480 hodin = 20 dní))"}
                    node={<NumberBox
                        placeholder={"payRestOfPriceWarningBeforeStartTripInHours"}
                        controlled={false}
                        id={FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours}
                        name={FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours}
                        defaultValue={state?.data?.payRestOfPriceWarningBeforeStartTripInHours || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"payInvoiceWarningAfterAcceptOfferInHours (Kolik hodin po akceptování nabídky musí prijít varování email (72 hodin = 3 dny))"}
                    node={<NumberBox
                        placeholder={"payInvoiceWarningAfterAcceptOfferInHours"}
                        controlled={false}
                        id={FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours}
                        name={FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours}
                        defaultValue={state?.data?.payInvoiceWarningAfterAcceptOfferInHours || 0}
                        minValue={0}
                    />}
                />
                <Heading text={"Fee & Deposit"} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
                <AppConfigItem
                    text={"tripDepositInPercentage (Jaká je záloha na trip (25%)"}
                    node={<NumberBox
                        placeholder={"tripDepositInPercentage"}
                        controlled={false}
                        id={FormDataEnum.tripDepositInPercentage}
                        name={FormDataEnum.tripDepositInPercentage}
                        defaultValue={state?.data?.tripDepositInPercentage || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelFeePercentageForDemander (Poplatek za ukončení pro demandera (5%)"}
                    node={<NumberBox
                        placeholder={"tripCancelFeePercentageForDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelFeePercentageForDemander}
                        name={FormDataEnum.tripCancelFeePercentageForDemander}
                        defaultValue={state?.data?.tripCancelFeePercentageForDemander || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelFeeAfterLimitPercentageForDemander (Poplatek za ukončení po limitu (60%)"}
                    node={<NumberBox
                        placeholder={"tripCancelFeeAfterLimitPercentageForDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander}
                        name={FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander}
                        defaultValue={state?.data?.tripCancelFeeAfterLimitPercentageForDemander || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripOfferCommissionPercentage (Trip provize (10%)"}
                    node={<NumberBox
                        placeholder={"tripOfferCommissionPercentage"}
                        controlled={false}
                        id={FormDataEnum.tripOfferCommissionPercentage}
                        name={FormDataEnum.tripOfferCommissionPercentage}
                        defaultValue={state?.data?.tripOfferCommissionPercentage || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelPenaltyPercentageForTransporterFromCompany (Pokuta za ukončení transporterovi pro firmu (10%)"}
                    node={<NumberBox
                        placeholder={"tripCancelPenaltyPercentageForTransporterFromCompany"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany}
                        name={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany}
                        defaultValue={state?.data?.tripCancelPenaltyPercentageForTransporterFromCompany || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelPenaltyMinAmountInCzkForTransporterFromCompany (Minimalni Pokuta za ukončení transporterovi pro firmu (5000 Kč)"}
                    node={<NumberBox
                        placeholder={"tripCancelPenaltyMinAmountInCzkForTransporterFromCompany"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                        name={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                        defaultValue={state?.data?.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelPenaltyPercentageForTransporterFromDemander (Pokuta za ukončení transporterovi pro demandera (20%)"}
                    node={<NumberBox
                        placeholder={"tripCancelPenaltyPercentageForTransporterFromDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander}
                        name={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander}
                        defaultValue={state?.data?.tripCancelPenaltyPercentageForTransporterFromDemander || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelPenaltyMinAmountInCzkForTransporterFromDemander (Minimalni Pokuta za ukončení transporterovi pro demandera (5000 Kč)"}
                    node={<NumberBox
                        placeholder={"tripCancelPenaltyMinAmountInCzkForTransporterFromDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                        name={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                        defaultValue={state?.data?.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelPenaltyLimitInDays (Od kdy je vyší pokuta za ukončení před tripem (21 dní)"}
                    node={<NumberBox
                        placeholder={"tripCancelPenaltyLimitInDays"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyLimitInDays}
                        name={FormDataEnum.tripCancelPenaltyLimitInDays}
                        defaultValue={state?.data?.tripCancelPenaltyLimitInDays || 0}
                        minValue={0}
                    />}
                />
                <AppConfigItem
                    text={"tripCancelPenaltyAfterLimitPercentageForTransporter (Pokuta za ukončení tripu pro transportera po limitu (30 %)"}
                    node={<NumberBox
                        placeholder={"tripCancelPenaltyAfterLimitPercentageForTransporter"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter}
                        name={FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter}
                        defaultValue={state?.data?.tripCancelPenaltyAfterLimitPercentageForTransporter || 0}
                        minValue={0}
                    />}
                />
                <ButtonClick
                    controlled={false}
                    size={ButtonSize.BUTTON_SIZE_M}
                    type={ButtonType.BLACK}
                    isDisabled={pending}
                    label={"Change"}
                />
            </LayoutFlexColumn>

        </form>
    </LayoutFlexColumn>
};

export default AppConfigPage;

interface IAppConfigItemProps {
    text: string;
    node: React.ReactNode;
}

export const AppConfigItem = (props: IAppConfigItemProps) => {
    const {text, node} = props;
    return <div style={{borderBottom: "2px solid black", paddingBottom: 15}}>
        <LayoutFlexRow gap={FlexGap.SMALL_16} justifyContent={"space-around"}>
            <div style={{width: "100%"}}>
                <Text
                    text={text}
                    fontSize={FontSize.BASE_14}
                />
            </div>
            <div style={{width: "100%"}}>
                {node}
            </div>
        </LayoutFlexRow>
    </div>
}