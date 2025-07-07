import React from "react";
import {IModalProps, Modal, ModalSize} from "./modal";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: Modal,
    args: {
        open: true,
        onClose: () => {},
        size: ModalSize.M_700
    }
} as Meta<IModalProps>;

export const ModalStory: StoryObj<IModalProps> = {
    render: (args) => <Modal {...args}>
        <div>CONTENT</div>
    </Modal>,
    args: {}
};