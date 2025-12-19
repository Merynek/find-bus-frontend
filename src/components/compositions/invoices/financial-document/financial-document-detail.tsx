import styles from "./financial-document-detail.module.scss";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import React from "react";
import {formatDateTime} from "@/src/utils/date-time.format";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {FinancialDocument} from "@/src/data/documents/financialDocument";
import {useApp} from "@/src/context/AppContext";
import {useCurrentLocale} from "@/src/hooks/translateHook";

export interface IFinancialDocumentProps {
    financialDocument: FinancialDocument;
}

export const FinancialDocumentDetail = (props: IFinancialDocumentProps) => {
    const {financialDocument} = props;
    const {showLoader, hideLoader} = useApp();
    const locale = useCurrentLocale();

    return <div className={styles.layout}>
        <LayoutFlexRow>
            <span>ID: </span>
            <span>{financialDocument.id}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>variableSymbol: </span>
            <span>{financialDocument.variableSymbol}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>dateOfIssue: </span>
            <span>{formatDateTime({
                locale: locale,
                date: financialDocument.dateOfIssue
            })}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>dueDate: </span>
            <span>{formatDateTime({
                locale: locale,
                date: financialDocument.dueDate
            })}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>type: </span>
            <span>{financialDocument.type.toString()}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>Payed: </span>
            <span>{financialDocument.payed.toString()}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>Price: </span>
            <span>{financialDocument.price.amount.toString() + " " + financialDocument.price.currency.toString()}</span>
        </LayoutFlexRow>
        <ButtonClick
            controlled={true}
            onClick={async () => {
                showLoader();
                try {
                    const downloadUrl = `/api/download/${financialDocument.id}?type=${encodeURIComponent(financialDocument.type.toString())}`;
                    const response = await fetch(downloadUrl);

                    if (!response.ok) {
                        throw new Error('Nepodařilo se stáhnout dokument');
                    }
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    const contentDisposition = response.headers.get('Content-Disposition');

                    a.href = url;
                    a.download = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || `document_${financialDocument.id}.pdf`;
                    document.body.appendChild(a);
                    a.click();

                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);

                } catch (error) {
                    console.error("Chyba při stahování:", error);
                } finally {
                    hideLoader();
                }
            }}
            label={"Download"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </div>
};