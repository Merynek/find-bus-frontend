import {Modal, ModalSize} from "../modal/modal";
import React from "react";
import styles from "./modal-dialog.module.scss";
import {cn} from "@/src/utils/common";
import {observer} from "mobx-react";
import {FontSize, FontWeight, Text} from "../texts/text/text";
import {ButtonClick, ButtonSize, ButtonType} from "../button/button";
import {Icon} from "../icon/icon";
import {IconType} from "@/src/enums/icon.enum";

export interface IModalDialogProps {
    open: boolean;
    headerText: string;
    footerContent?: React.ReactNode;
    onClose: () => void;
    modalSize?: ModalSize;
    children: React.ReactNode;
}

export const ModalDialog = observer((props: IModalDialogProps) => {
    const {
        headerText,
        footerContent,
        children,
        onClose,
        modalSize,
        open,
    } = props;


    const renderHeaderText = () => {
        return <Text
            text={headerText}
            fontSize={FontSize.M_24}
            fontWeight={FontWeight.SEMIBOLD}
        />
    }

    const renderCrossButton = () => {
        return <div className={cn(styles.closeButton)}>
            <ButtonClick
                label={"close"}
                onClick={onClose}
                size={ButtonSize.BY_CONTENT}
                type={ButtonType.YELLOW}
            >
                <Icon
                    icon={IconType.CLOSE}
                />
            </ButtonClick>
        </div>
    }

    const renderHeader = () => (
        <div className={cn(styles.header)}>
            {renderHeaderText()}
            {renderCrossButton()}
        </div>
    );

    const renderContent = () => (
        <div className={cn(styles.content)}>
            {children}
        </div>
    );

    const renderFooter = () => {
        if (footerContent) {
            return <div className={cn(styles.footer)}>
                {footerContent}
            </div>
        }
        return;
    }

    return <Modal
        open={open}
        onClose={onClose}
        size={ModalSize.M_700}
    >
        <div className={styles.layout}>
            {renderHeader()}
            {renderContent()}
            {renderFooter()}
        </div>
    </Modal>
})