import {ModalDialog} from "@/src/components/components/modal-dialog/modal-dialog";
import React, {useState} from "react";
import {SignUpForm} from "@/src/components/compositions/sign/sign-up/sign-up-form";
import {SignInForm} from "@/src/components/compositions/sign/sign-in/sign-in-form";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";

export interface ISignModalProps {
    afterRegistration?: (email: string) => Promise<void>;
    afterLogin?: () => Promise<void>;
    onClose: () => void;
    open: boolean;
}

export const SignModal = (props: ISignModalProps) => {
    const {open, onClose, afterRegistration, afterLogin} = props;
    const [signIn, setSignIn] = useState(false);
    const buttonName = signIn ? "Chcete se registrovat?" : "Chcete se Přihlasit?";
    return (
        <ModalDialog
            open={open}
            headerText={"----"}
            onClose={onClose}
        >
            <ButtonClick
                controlled={true}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
                label={buttonName}
                onClick={() => {
                    setSignIn(!signIn);
                }}
            />
            <div style={{padding: "50px"}}>
                {signIn && <SignInForm
                    showRegistrationSection={false}
                    afterLoginAction={afterLogin}
                />}
                {!signIn && <SignUpForm afterRegistration={afterRegistration} />}
            </div>
        </ModalDialog>
    )
}
