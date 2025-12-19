import React from "react";
import {IFinancialDocumentProps, FinancialDocumentDetail} from "./financial-document-detail";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomFinancialDocument} from "@/dataGenerator/financialDocuments";

export default {
    component: FinancialDocumentDetail,
    args: {
    }
} as Meta<IFinancialDocumentProps>;

export const TripInvoiceDetailStory: StoryObj<IFinancialDocumentProps> = {
    render: (args) => <FinancialDocumentDetail
        {...args}
        financialDocument={getRandomFinancialDocument()}
    />,
    args: {}
};