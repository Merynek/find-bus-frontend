import React from "react";
import {Meta, StoryObj} from "@storybook/nextjs";
import {Popup} from "@/src/components/components/popup/popup";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";

const meta: Meta<typeof Popup> = {
    component: Popup,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof Popup> = {
    render: (args) => <Popup
        {...args}
        opener={<span>OPEN HERE</span>}
    >
        {(close) => {
            return <ButtonClick
                controlled={true}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
                label={"RANDOM CONTENT"}
                onClick={() => {
                    close();
                }}
            />
        }}
    </Popup>
};