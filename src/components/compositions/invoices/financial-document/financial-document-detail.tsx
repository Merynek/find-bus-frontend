import {observer} from "mobx-react";
import styles from "./financial-document-detail.module.scss";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import React from "react";
import {formatDateTime} from "@/src/utils/date-time.format";
import {useBean} from "ironbean-react";
import {Configuration} from "@/src/singletons/configuration";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import {AppManager} from "@/src/singletons/app-manager";
import {FinancialDocument} from "@/src/data/documents/financialDocument";

export interface IFinancialDocumentProps {
    document: FinancialDocument;
}

export const FinancialDocumentDetail = observer((props: IFinancialDocumentProps) => {
    const {document} = props;
    const _configuration = useBean(Configuration);
    const _tripsOfferApi = useBean(TripsOfferApi);
    const _appManager = useBean(AppManager);

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
                locale: _configuration.locale,
                date: document.dateOfIssue
            })}</span>
        </LayoutFlexRow>
        <LayoutFlexRow>
            <span>dueDate: </span>
            <span>{formatDateTime({
                locale: _configuration.locale,
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
            onClick={async () => {
                _appManager.loading = true;
                await _tripsOfferApi.downloadFinancialDocument({
                    documentId: document.id,
                    type: document.type
                })
                _appManager.loading = false;
            }}
            label={"Download"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </div>
});