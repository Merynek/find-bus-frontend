import React from "react";
import {observer} from "mobx-react";
import styles from "./modal.module.scss";
import Dialog from '@mui/material/Dialog';

export enum ModalSize {
    FULL_SCREEN = "FULL_SCREEN",
    M_700 = "M_700"
}

export interface IModalProps {
    open: boolean;
    onClose?: () => void;
    size?: ModalSize;
    children: React.ReactNode;
}

export const Modal = observer((props: IModalProps) => {
    const {onClose, open, children} = props;

    return <Dialog
        onClose={onClose}
        open={open}
    >
        <div className={styles.layout}>
            {children}
        </div>
    </Dialog>
});