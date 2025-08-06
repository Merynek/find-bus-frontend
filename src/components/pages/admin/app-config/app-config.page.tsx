"use client";

import React, {useActionState} from "react";
import styles from "./app-config.page.module.scss";
import {appConfigFormAction} from "@/src/app/actions/forms/admin/appConfig/appConfigFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {AppBusinessConfigResponseDto} from "@/src/api/openapi";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";

interface IAppConfigPageProps {
    cfg: AppBusinessConfigResponseDto;
}

const AppConfigPage = (props: IAppConfigPageProps) => {
    const cfg = AppBusinessConfigConverter.toInstance(props.cfg);
    const appConfig = AppBusinessConfigConverter.toInstance(cfg);
    const [state, action, pending] = useActionState(appConfigFormAction, undefined)

    return <div className={styles.layout}>
        <form action={action}>
            <h2>Create Trip</h2>
            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.minEndOrderFromNowInHours}>minEndOrderFromNowInHours (Minimální datum
                        vytvoření aukce od teď (24 hodin))</label>
                    <input id={FormDataEnum.minEndOrderFromNowInHours} name={FormDataEnum.minEndOrderFromNowInHours}
                           placeholder="minEndOrderFromNowInHours" type={"number"} defaultValue={appConfig.minEndOrderFromNowInHours}/>
                </div>
                {state?.errors?.minEndOrderFromNowInHours && <p>{state.errors.minEndOrderFromNowInHours._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours}>minDiffBetweenStartTripAndEndOrderInHours
                        (Minimální rozdíl hodin konce aukce a odjezdem (480 hodin = 20 dní)</label>
                    <input id={FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours}
                           name={FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours}
                           placeholder="minDiffBetweenStartTripAndEndOrderInHours" type={"number"} defaultValue={appConfig.minDiffBetweenStartTripAndEndOrderInHours}/>
                </div>
                {state?.errors?.minDiffBetweenStartTripAndEndOrderInHours &&
                    <p>{state.errors.minDiffBetweenStartTripAndEndOrderInHours._errors}</p>}
            </div>

            <h2>Trip Offers</h2>
            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.minDateToAcceptOfferInHours}>minDateToAcceptOfferInHours (Jak dlouho má
                        uživatel přijmout nabídku po té co aukce skončila a nic si zatím nevybral (24 hodin))</label>
                    <input id={FormDataEnum.minDateToAcceptOfferInHours}
                           name={FormDataEnum.minDateToAcceptOfferInHours}
                           placeholder="minDateToAcceptOfferInHours" type={"number"} defaultValue={appConfig.minDateToAcceptOfferInHours}/>
                </div>
                {state?.errors?.minDateToAcceptOfferInHours &&
                    <p>{state.errors.minDateToAcceptOfferInHours._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}>minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours
                        (Minimální rozdíl hodin konce aukce a odjezdem pro zobrazení všech method zaplacení (600 hodin =
                        25 dní))</label>
                    <input id={FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                           name={FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                           placeholder="minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours" type={"number"} defaultValue={appConfig.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}/>
                </div>
                {state?.errors?.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours &&
                    <p>{state.errors.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours._errors}</p>}
            </div>

            <h2>Notifications</h2>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours}>payRestOfPriceWarningBeforeStartTripInHours
                        (Pouze pro doplatek 75%) - Kolik hodin před zařátkem tripu máme posilat warning email Doplatek
                        (480 hodin = 20 dní))</label>
                    <input id={FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours}
                           name={FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours}
                           placeholder="payRestOfPriceWarningBeforeStartTripInHours" type={"number"} defaultValue={appConfig.payRestOfPriceWarningBeforeStartTripInHours}/>
                </div>
                {state?.errors?.payRestOfPriceWarningBeforeStartTripInHours &&
                    <p>{state.errors.payRestOfPriceWarningBeforeStartTripInHours._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours}>payInvoiceWarningAfterAcceptOfferInHours
                        (Kolik hodin po akceptování nabídky musí prijít varování email (72 hodin = 3 dny))</label>
                    <input id={FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours}
                           name={FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours}
                           placeholder="payInvoiceWarningAfterAcceptOfferInHours" type={"number"} defaultValue={appConfig.payInvoiceWarningAfterAcceptOfferInHours}/>
                </div>
                {state?.errors?.payInvoiceWarningAfterAcceptOfferInHours &&
                    <p>{state.errors.payInvoiceWarningAfterAcceptOfferInHours._errors}</p>}
            </div>

            <h2>Fee & Deposit</h2>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripDepositInPercentage}>tripDepositInPercentage (Jaká je záloha na
                        trip (25%)</label>
                    <input id={FormDataEnum.tripDepositInPercentage}
                           name={FormDataEnum.tripDepositInPercentage}
                           placeholder="tripDepositInPercentage" type={"number"} defaultValue={appConfig.tripDepositInPercentage}/>
                </div>
                {state?.errors?.tripDepositInPercentage &&
                    <p>{state.errors.tripDepositInPercentage._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelFeePercentageForDemander}>tripCancelFeePercentageForDemander
                        (Poplatek za ukončení pro demandera (5%)</label>
                    <input id={FormDataEnum.tripCancelFeePercentageForDemander}
                           name={FormDataEnum.tripCancelFeePercentageForDemander}
                           placeholder="tripCancelFeePercentageForDemander" type={"number"} defaultValue={appConfig.tripCancelFeePercentageForDemander}/>
                </div>
                {state?.errors?.tripCancelFeePercentageForDemander &&
                    <p>{state.errors.tripCancelFeePercentageForDemander._errors}</p>}
            </div>


            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander}>tripCancelFeeAfterLimitPercentageForDemander
                        (Poplatek za ukončení po limitu (60%)</label>
                    <input id={FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander}
                           name={FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander}
                           placeholder="tripCancelFeeAfterLimitPercentageForDemander" type={"number"} defaultValue={appConfig.tripCancelFeeAfterLimitPercentageForDemander}/>
                </div>
                {state?.errors?.tripCancelFeeAfterLimitPercentageForDemander &&
                    <p>{state.errors.tripCancelFeeAfterLimitPercentageForDemander._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripOfferCommissionPercentage}>tripOfferCommissionPercentage (Trip
                        provize (10%)</label>
                    <input id={FormDataEnum.tripOfferCommissionPercentage}
                           name={FormDataEnum.tripOfferCommissionPercentage}
                           placeholder="tripOfferCommissionPercentage" type={"number"} defaultValue={appConfig.tripOfferCommissionPercentage}/>
                </div>
                {state?.errors?.tripOfferCommissionPercentage &&
                    <p>{state.errors.tripOfferCommissionPercentage._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany}>tripCancelPenaltyPercentageForTransporterFromCompany
                        (Pokuta za ukončení transporterovi pro firmu (10%)</label>
                    <input id={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany}
                           name={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany}
                           placeholder="tripCancelPenaltyPercentageForTransporterFromCompany" type={"number"} defaultValue={appConfig.tripCancelPenaltyPercentageForTransporterFromCompany}/>
                </div>
                {state?.errors?.tripCancelPenaltyPercentageForTransporterFromCompany &&
                    <p>{state.errors.tripCancelPenaltyPercentageForTransporterFromCompany._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}>tripCancelPenaltyMinAmountInCzkForTransporterFromCompany
                        (Minimalni Pokuta za ukončení transporterovi pro firmu (5000 Kč)</label>
                    <input id={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                           name={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                           placeholder="tripCancelPenaltyMinAmountInCzkForTransporterFromCompany" type={"number"} defaultValue={appConfig.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}/>
                </div>
                {state?.errors?.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany &&
                    <p>{state.errors.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander}>tripCancelPenaltyPercentageForTransporterFromDemander
                        (Pokuta za ukončení transporterovi pro demandera (20%)</label>
                    <input id={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander}
                           name={FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander}
                           placeholder="tripCancelPenaltyPercentageForTransporterFromDemander" type={"number"} defaultValue={appConfig.tripCancelPenaltyPercentageForTransporterFromDemander}/>
                </div>
                {state?.errors?.tripCancelPenaltyPercentageForTransporterFromDemander &&
                    <p>{state.errors.tripCancelPenaltyPercentageForTransporterFromDemander._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}>tripCancelPenaltyMinAmountInCzkForTransporterFromDemander
                        (Minimalni Pokuta za ukončení transporterovi pro demandera (5000 Kč)</label>
                    <input id={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                           name={FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                           placeholder="tripCancelPenaltyMinAmountInCzkForTransporterFromDemander" type={"number"} defaultValue={appConfig.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}/>
                </div>
                {state?.errors?.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander &&
                    <p>{state.errors.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander._errors}</p>}
            </div>


            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelPenaltyLimitInDays}>tripCancelPenaltyLimitInDays (Od kdy je
                        vyší pokuta za ukončení před tripem (21 dní)</label>
                    <input id={FormDataEnum.tripCancelPenaltyLimitInDays}
                           name={FormDataEnum.tripCancelPenaltyLimitInDays}
                           placeholder="tripCancelPenaltyLimitInDays" type={"number"} defaultValue={appConfig.tripCancelPenaltyLimitInDays}/>
                </div>
                {state?.errors?.tripCancelPenaltyLimitInDays &&
                    <p>{state.errors.tripCancelPenaltyLimitInDays._errors}</p>}
            </div>

            <div className={styles.line}>
                <div>
                    <label htmlFor={FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter}>tripCancelPenaltyAfterLimitPercentageForTransporter
                        (Pokuta za ukončení tripu pro transportera po limitu (30 %)</label>
                    <input id={FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter}
                           name={FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter}
                           placeholder="tripCancelPenaltyAfterLimitPercentageForTransporter" type={"number"} defaultValue={appConfig.tripCancelPenaltyAfterLimitPercentageForTransporter}/>
                </div>
                {state?.errors?.tripCancelPenaltyAfterLimitPercentageForTransporter &&
                    <p>{state.errors.tripCancelPenaltyAfterLimitPercentageForTransporter._errors}</p>}
            </div>

            <button disabled={pending} type="submit">
                Change
            </button>
        </form>
    </div>
};

export default AppConfigPage;