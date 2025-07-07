import React, {useRef} from "react";
import {Configuration} from "@/src/singletons/configuration";
import styles from "./app-config.page.module.scss";
import {observer} from "mobx-react";
import {AppConfigPageStore} from "./app-config.page.store";
import {useNavigate} from "react-router-dom";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {useBean} from "ironbean-react";
import {NumberBox} from "../../../components/inputs/number-box/number-box";

export interface IAppConfigPageProps  {
}

const AppConfigPage = observer((props: IAppConfigPageProps) => {
    const _storeRef = useRef<AppConfigPageStore>(new AppConfigPageStore());
    const _locKey = "page.appconfig."
    const _configuration = useBean(Configuration);
    const navigate = useNavigate();
    const cfg = _configuration.appBusinessConfig;

    return <div className={styles.layout}>
        <h2>Create Trip</h2>
        <div className={styles.line}>
            <span>minEndOrderFromNowInHours (Minimální datum vytvoření aukce od teď "24 hodin")</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.minEndOrderFromNowInHours}
                    decimalCount={2}
                    onChange={(val) => {
                        if (val) {
                            cfg.minEndOrderFromNowInHours = val;
                        }
                    }}
                />
            </div>
        </div>
        <div className={styles.line}>
            <span>minDiffBetweenStartTripAndEndOrderInHours (Minimální rozdíl hodin konce aukce a odjezdem "480 hodin = 20 dní")</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.minDiffBetweenStartTripAndEndOrderInHours}
                    decimalCount={2}
                    onChange={(val) => {
                        if (val) {
                            cfg.minDiffBetweenStartTripAndEndOrderInHours = val;
                        }
                    }}
                />
            </div>
        </div>
        <h2>Trip Offers</h2>
        <div className={styles.line}>
            <span>minDateToAcceptOfferInHours (Jak dlouho má uživatel přijmout nabídku po té co aukce skončila a nic si zatím nevybral "24 hodin")</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.minDateToAcceptOfferInHours}
                    decimalCount={2}
                    onChange={(val) => {
                        if (val) {
                            cfg.minDateToAcceptOfferInHours = val;
                        }
                    }}
                />
            </div>
        </div>
        <div className={styles.line}>
            <span>minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours (Minimální rozdíl hodin konce aukce a odjezdem pro zobrazení všech method zaplacení "600 hodin = 25 dní")</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours}
                    decimalCount={2}
                    onChange={(val) => {
                        if (val) {
                            cfg.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours = val;
                        }
                    }}
                />
            </div>
        </div>
        <h2>Notifications</h2>
        <div className={styles.line}>
            <span>payRestOfPriceWarningBeforeStartTripInHours (Pouze pro doplatek 75%) - Kolik hodin před zařátkem tripu máme posilat warning email Doplatek "480 hodin = 20 dní")</span>
            <div className={styles.numberInput}>

            </div>
            <NumberBox
                value={cfg.payRestOfPriceWarningBeforeStartTripInHours}
                decimalCount={2}
                onChange={(val) => {
                    if (val) {
                        cfg.payRestOfPriceWarningBeforeStartTripInHours = val;
                    }
                }}/>
        </div>
        <div className={styles.line}>
            <span>payInvoiceWarningAfterAcceptOfferInHours (Kolik hodin po akceptování nabídky musí prijít varování email "72 hodin = 3 dny")</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.payInvoiceWarningAfterAcceptOfferInHours}
                    decimalCount={2}
                    onChange={(val) => {
                        if (val) {
                            cfg.payInvoiceWarningAfterAcceptOfferInHours = val;
                        }
                    }}
                />
            </div>
        </div>
        <h2>Fee & Deposit</h2>
        <div className={styles.line}>
            <span>tripDepositInPercentage (Jaká je záloha na trip (25%)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripDepositInPercentage}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripDepositInPercentage = val;
                        }
                    }}
                />
            </div>
        </div>
        <div className={styles.line}>
            <span>tripCancelFeePercentageForDemander (Poplatek za ukončení pro demandera (5%)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelFeePercentageForDemander}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelFeePercentageForDemander = val;
                        }
                    }}
                />
            </div>
        </div>
        <div className={styles.line}>
            <span>tripCancelFeeAfterLimitPercentageForDemander (Poplatek za ukončení po limitu (60%)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelFeeAfterLimitPercentageForDemander}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelFeeAfterLimitPercentageForDemander = val;
                        }
                    }}
                />
            </div>
        </div>
        <div className={styles.line}>
            <span>tripOfferCommissionPercentage (Trip provize (10%)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripOfferCommissionPercentage}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripOfferCommissionPercentage = val;
                        }
                    }}
                />
            </div>
        </div>
        <div className={styles.line}>
            <span>tripCancelPenaltyPercentageForTransporterFromCompany (Pokuta za ukončení transporterovi pro firmu (10%)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelPenaltyPercentageForTransporterFromCompany}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelPenaltyPercentageForTransporterFromCompany = val;
                        }
                    }}
                />
            </div>
        </div>

        <div className={styles.line}>
            <span>tripCancelPenaltyMinAmountInCzkForTransporterFromCompany (Minimalni Pokuta za ukončení transporterovi pro firmu (5000 Kč)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany = val;
                        }
                    }}
                />
            </div>
        </div>

        <div className={styles.line}>
            <span>tripCancelPenaltyPercentageForTransporterFromDemander (Pokuta za ukončení transporterovi pro demandera (20%)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelPenaltyPercentageForTransporterFromDemander}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelPenaltyPercentageForTransporterFromDemander = val;
                        }
                    }}
                />
            </div>
        </div>

        <div className={styles.line}>
            <span>tripCancelPenaltyMinAmountInCzkForTransporterFromDemander (Minimalni Pokuta za ukončení transporterovi pro demandera (5000 Kč)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander = val;
                        }
                    }}
                />
            </div>
        </div>

        <div className={styles.line}>
            <span>tripCancelPenaltyLimitInDays (Od kdy je vyší pokuta za ukončení před tripem (21 dní)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelPenaltyLimitInDays}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelPenaltyLimitInDays = val;
                        }
                    }}
                />
            </div>
        </div>

        <div className={styles.line}>
            <span>tripCancelPenaltyAfterLimitPercentageForTransporter (Pokuta za ukončení tripu pro transportera po limitu (30 %)</span>
            <div className={styles.numberInput}>
                <NumberBox
                    value={cfg.tripCancelPenaltyAfterLimitPercentageForTransporter}
                    onChange={(val) => {
                        if (val) {
                            cfg.tripCancelPenaltyAfterLimitPercentageForTransporter = val;
                        }
                    }}
                />
            </div>
        </div>

        <ButtonClick
            onClick={async () => {
                await _storeRef.current.postChanges();
                navigate(0);
            }}
            label={"Change"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}/>
    </div>
});

export default AppConfigPage;