import styles from "./financial-document-detail.module.scss";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import React from "react";
import {formatDateTime} from "@/src/utils/date-time.format";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {FinancialDocument} from "@/src/data/documents/financialDocument";
import {TripOfferService} from "@/src/services/TripOfferService";
import {useApp} from "@/src/app/contexts/AppContext";
import {useCurrentLocale} from "@/src/hooks/translateHook";

export interface IFinancialDocumentProps {
    document: FinancialDocument;
}

export const FinancialDocumentDetail = (props: IFinancialDocumentProps) => {
    const {document} = props;
    const {showLoader, hideLoader} = useApp();
    const locale = useCurrentLocale();

    return <div className={styles.layout}>
        <LayoutFlexRow>
            <span>ID: </span>
            <span>{document.id}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>variableSymbol: </span>
            <span>{document.variableSymbol}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>dateOfIssue: </span>
            <span>{formatDateTime({
                locale: locale,
                date: document.dateOfIssue
            })}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>dueDate: </span>
            <span>{formatDateTime({
                locale: locale,
                date: document.dueDate
            })}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>type: </span>
            <span>{document.type.toString()}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>Payed: </span>
            <span>{document.payed.toString()}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>Price: </span>
            <span>{document.price.amount.toString() + " " + document.price.currency.toString()}</span>
        </LayoutFlexRow>
        <ButtonClick
            controlled={true}
            onClick={async () => {
                showLoader();
                await TripOfferService.downloadFinancialDocument({
                    documentId: document.id,
                    type: document.type
                })
                hideLoader();
            }}
            label={"Download"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </div>
};