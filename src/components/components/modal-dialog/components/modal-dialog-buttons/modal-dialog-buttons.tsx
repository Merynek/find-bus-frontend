import React from "react";
import {observer} from "mobx-react";
import styles from "./modal-dialog-buttons.module.scss";
import {ButtonClick, IClickButtonProps, ILinkButtonProps, ButtonLink} from "../../../button/button";
import {cn} from "@/src/utils/common";

export interface IModalButtonsProps {
    children: React.ReactNode[];
}

export const ModalButtons = observer((props: IModalButtonsProps) => {
    const {children} = props;

    const getClass = () => {
        const length = children.length;
        switch (length) {
            case 1: return styles.one;
            case 2: return styles.two;
            default: return "";
        }
    }

    return <div className={cn(styles.modalButtons, getClass())}>
        {children.map((button, index) => {
            return <div key={index} className={styles.modalButtonWrap}>
                {button}
            </div>
        })}
    </div>;
})

interface IModalButtonBaseProps {
    isLink: boolean;
}

export interface IModalLinkButtonProps extends IModalButtonBaseProps {
    isLink: true;
    buttonProps: ILinkButtonProps;
}

export interface IModalClickButtonProps extends IModalButtonBaseProps {
    isLink: false;
    buttonProps: IClickButtonProps;
}

type TModalButton = IModalLinkButtonProps|IModalClickButtonProps;

export const ModalButton = observer((props: TModalButton) => {
    const {isLink, buttonProps} = props;

    if (isLink) {
        return <div className={cn(styles.modalButton)} >
            <ButtonLink {...buttonProps as ILinkButtonProps} />
        </div>
    }
    return <div className={cn(styles.modalButton)} >
        <ButtonClick {...buttonProps as IClickButtonProps} />
    </div>
});