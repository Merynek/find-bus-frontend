import {ModalDialog} from "@/src/components/components/modal-dialog/modal-dialog";
import React from "react";
import {SignUpForm} from "@/src/components/compositions/sign/sign-up/sign-up-form";

export interface ISignModalProps {
    afterRegistration?: (email: string) => Promise<void>;
    onClose: () => void;
    open: boolean;
}

export const SignModal = (props: ISignModalProps) => {
    const {open, onClose, afterRegistration} = props;
    return (
        <ModalDialog
            open={open}
            headerText={"----"}
            onClose={onClose}
        >
            <SignUpForm afterRegistration={afterRegistration} />
        </ModalDialog>
    )
}
