import React from "react";
import AppConfigPage from "./app-config.page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: AppConfigPage,
    args: {}
};

export const AppConfigPageStory: StoryObj = {
    render: () => <AppConfigPage
        cfg={
            {
                minEndOrderFromNowInHours: 24,
                minDiffBetweenStartTripAndEndOrderInHours: 480,
                minDateToAcceptOfferInHours: 24,
                minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: 600,
                payRestOfPriceWarningBeforeStartTripInHours: 480,
                payInvoiceWarningAfterAcceptOfferInHours: 72,
                tripDepositInPercentage: 25,
                tripCancelFeePercentageForDemander: 5,
                tripCancelFeeAfterLimitPercentageForDemander: 60,
                tripOfferCommissionPercentage: 10,
                tripCancelPenaltyPercentageForTransporterFromCompany: 10,
                tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: 5000,
                tripCancelPenaltyPercentageForTransporterFromDemander: 20,
                tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: 5000,
                tripCancelPenaltyLimitInDays: 21,
                tripCancelPenaltyAfterLimitPercentageForTransporter: 30
            }
        }
    />,
    args: {}
};