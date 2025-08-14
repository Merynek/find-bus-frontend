import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {IModalButtonsProps, ModalButton, ModalButtons} from "./modal-dialog-buttons";
import {ButtonSize, ButtonType} from "../../../button/button";

export default {
    component: ModalButtons,
    args: {}
} as Meta<IModalButtonsProps>;

export const ModalButtonsStory: StoryObj<IModalButtonsProps> = {
    render: () =>  <ModalButtons>
        <ModalButton
            isLink={false}
            buttonProps={{
                type: ButtonType.YELLOW,
                size: ButtonSize.BUTTON_SIZE_M,
                label: "cancel",
                onClick: () => {
                    console.log("click")
                }
            }}
        />
        <ModalButton
            isLink={false}
            buttonProps={{
                type: ButtonType.BLACK,
                size: ButtonSize.BUTTON_SIZE_M,
                label: "submit",
                onClick: () => {
                    console.log("click")
                }
            }}
        />
    </ModalButtons>,
    args: {}
};