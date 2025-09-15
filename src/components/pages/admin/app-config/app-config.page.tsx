"use client";

import React from "react";
import styles from "./app-config.page.module.scss";
import {appConfigFormAction} from "@/src/app/actions/forms/admin/appConfig/appConfigFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {AppBusinessConfigResponseDto} from "@/src/api/openapi";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";

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

    return <div className={styles.layout}>
        <form action={action}>
            <FormStatus state={state}/>
            <h2>Create Trip</h2>
            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text text={"minEndOrderFromNowInHours (Minimální datum vytvoření aukce od teď (24 hodin))"}
                          fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"minEndOrderFromNowInHours"}
                        controlled={false}
                        id={FormDataEnum.templateId}
                        name={FormDataEnum.templateId}
                        defaultValue={state?.data?.minEndOrderFromNowInHours || 0}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>
            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"minDiffBetweenStartTripAndEndOrderInHours (Minimální rozdíl hodin konce aukce a odjezdem (480 hodin = 20 dní)"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"minDiffBetweenStartTripAndEndOrderInHours"}
                        controlled={false}
                        id={FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours}
                        name={FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours}
                        defaultValue={appConfig.minDiffBetweenStartTripAndEndOrderInHours}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <h2>Trip Offers</h2>
            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"minDateToAcceptOfferInHours (Jak dlouho má uživatel přijmout nabídku po té co aukce skončila a nic si zatím nevybral (24 hodin))"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"minDateToAcceptOfferInHours"}
                        controlled={false}
                        id={FormDataEnum.minDateToAcceptOfferInHours}
                        name={FormDataEnum.minDateToAcceptOfferInHours}
                        defaultValue={appConfig.minDateToAcceptOfferInHours}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours (Minimální rozdíl hodin konce aukce a odjezdem pro zobrazení všech method zaplacení (600 hodin = 25 dní))"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours"}
                        controlled={false}
                        id={FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                        name={FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                        defaultValue={appConfig.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <h2>Notifications</h2>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"payRestOfPriceWarningBeforeStartTripInHours (Pouze pro doplatek 75%) - Kolik hodin před zařátkem tripu máme posilat warning email Doplatek (480 hodin = 20 dní))"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"payRestOfPriceWarningBeforeStartTripInHours"}
                        controlled={false}
                        id={FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours}
                        name={FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours}
                        defaultValue={appConfig.payRestOfPriceWarningBeforeStartTripInHours}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"payInvoiceWarningAfterAcceptOfferInHours (Kolik hodin po akceptování nabídky musí prijít varování email (72 hodin = 3 dny))"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"payInvoiceWarningAfterAcceptOfferInHours"}
                        controlled={false}
                        id={FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours}
                        name={FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours}
                        defaultValue={appConfig.payInvoiceWarningAfterAcceptOfferInHours}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <h2>Fee & Deposit</h2>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text text={"tripDepositInPercentage (Jaká je záloha na trip (25%)"} fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripDepositInPercentage"}
                        controlled={false}
                        id={FormDataEnum.tripDepositInPercentage}
                        name={FormDataEnum.tripDepositInPercentage}
                        defaultValue={appConfig.tripDepositInPercentage}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text text={"tripCancelFeePercentageForDemander (Poplatek za ukončení pro demandera (5%)"}
                          fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelFeePercentageForDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelFeePercentageForDemander}
                        name={FormDataEnum.tripCancelFeePercentageForDemander}
                        defaultValue={appConfig.tripCancelFeePercentageForDemander}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>


            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text text={"tripCancelFeeAfterLimitPercentageForDemander (Poplatek za ukončení po limitu (60%)"}
                          fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelFeeAfterLimitPercentageForDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander}
                        name={FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander}
                        defaultValue={appConfig.tripCancelFeeAfterLimitPercentageForDemander}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text text={"tripOfferCommissionPercentage (Trip provize (10%)"} fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripOfferCommissionPercentage"}
                        controlled={false}
                        id={FormDataEnum.tripOfferCommissionPercentage}
                        name={FormDataEnum.tripOfferCommissionPercentage}
                        defaultValue={appConfig.tripOfferCommissionPercentage}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"tripCancelPenaltyPercentageForTransporterFromCompany (Pokuta za ukončení transporterovi pro firmu (10%)"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelPenaltyPercentageForTransporterFromCompany"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany}
                        name={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany}
                        defaultValue={appConfig.tripCancelPenaltyPercentageForTransporterFromCompany}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"tripCancelPenaltyMinAmountInCzkForTransporterFromCompany (Minimalni Pokuta za ukončení transporterovi pro firmu (5000 Kč)"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelPenaltyMinAmountInCzkForTransporterFromCompany"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                        name={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                        defaultValue={appConfig.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"tripCancelPenaltyPercentageForTransporterFromDemander (Pokuta za ukončení transporterovi pro demandera (20%)"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelPenaltyPercentageForTransporterFromDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander}
                        name={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander}
                        defaultValue={appConfig.tripCancelPenaltyPercentageForTransporterFromDemander}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"tripCancelPenaltyMinAmountInCzkForTransporterFromDemander (Minimalni Pokuta za ukončení transporterovi pro demandera (5000 Kč)"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelPenaltyMinAmountInCzkForTransporterFromDemander"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                        name={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                        defaultValue={appConfig.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>


            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text text={"tripCancelPenaltyLimitInDays (Od kdy je vyší pokuta za ukončení před tripem (21 dní)"}
                          fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelPenaltyLimitInDays"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyLimitInDays}
                        name={FormDataEnum.tripCancelPenaltyLimitInDays}
                        defaultValue={appConfig.tripCancelPenaltyLimitInDays}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <div className={styles.line}>
                <LayoutFlexRow>
                    <Text
                        text={"tripCancelPenaltyAfterLimitPercentageForTransporter (Pokuta za ukončení tripu pro transportera po limitu (30 %)"}
                        fontSize={FontSize.BASE_14}/>
                    <NumberBox
                        placeholder={"tripCancelPenaltyAfterLimitPercentageForTransporter"}
                        controlled={false}
                        id={FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter}
                        name={FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter}
                        defaultValue={appConfig.tripCancelPenaltyAfterLimitPercentageForTransporter}
                        minValue={0}
                    />
                </LayoutFlexRow>
            </div>

            <ButtonClick
                controlled={false}
                size={ButtonSize.BUTTON_SIZE_M}
                type={ButtonType.BLACK}
                isDisabled={pending}
                label={"Change"}
            />
        </form>
    </div>
};

export default AppConfigPage;