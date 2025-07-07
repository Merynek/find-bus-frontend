import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../button/button";
import {IModalDialogProps, ModalDialog} from "./modal-dialog";
import {ModalButtons} from "./components/modal-dialog-buttons/modal-dialog-buttons";
import {Modal, ModalSize} from "../modal/modal";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: Modal,
    args: {
        headerText: "SMAZANI",
        open: true,
        onClose: () => {},
        size: ModalSize.M_700
    }
} as Meta<IModalDialogProps>;

export const ModalDialogStory: StoryObj<IModalDialogProps> = {
    render: (args) =>  <ModalDialog
        {...args}
        footerContent={<ModalButtons>
            <ButtonClick
                size={ButtonSize.BUTTON_SIZE_M}
                type={ButtonType.YELLOW}
                label="cancel"
                onClick={() => {
                    console.log("click");
                }}
            />
            <ButtonClick
                size={ButtonSize.BUTTON_SIZE_M}
                type={ButtonType.BLACK}
                label="submit"
                onClick={() => {
                    console.log("click");
                }}
            />
        </ModalButtons>}
    >
        <span>Jste si opravdu jisti, že chcete svoji nahranou cestu/návštěvu smazat?</span>
    </ModalDialog>,
    args: {}
};