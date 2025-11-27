import {ModalDialog} from "../../../components/modal-dialog/modal-dialog";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import React from "react";
import {ModalButtons} from "../../../components/modal-dialog/components/modal-dialog-buttons/modal-dialog-buttons";

export interface IConfirmDialogProps {
    onClose: () => void;
    onChange: () => void;
    title: string;
    cancelButtonText: string;
    submitButtonText: string;
    submitButtonDisabled?: boolean;
    message: React.ReactNode;
    open: boolean;
}

export const ConfirmDialog = (props: IConfirmDialogProps) => {
    const {open, submitButtonText, cancelButtonText, title, onClose, message, submitButtonDisabled} = props;
    return (
        <ModalDialog
            open={open}
            headerText={title}
            onClose={onClose}
            footerContent={<ModalButtons>
                <ButtonClick
                    controlled={true}
                    size={ButtonSize.BUTTON_SIZE_M}
                    type={ButtonType.YELLOW}
                    label={cancelButtonText}
                    onClick={() => {
                        props.onClose();
                    }}
                />
                <ButtonClick
                    controlled={true}
                    size={ButtonSize.BUTTON_SIZE_M}
                    type={ButtonType.BLACK}
                    isDisabled={submitButtonDisabled}
                    label={submitButtonText}
                    onClick={() => {
                        props.onChange();
                    }}
                />
            </ModalButtons>}
        >
            {message}
        </ModalDialog>
    )
};