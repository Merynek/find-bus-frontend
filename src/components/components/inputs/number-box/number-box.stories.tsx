import React, {useState} from "react";
import {NumberBox} from "./number-box";
import {Meta, StoryObj} from "@storybook/nextjs";
import {IconType} from "@/src/enums/icon.enum";

const meta: Meta<typeof NumberBox> = {
    component: NumberBox,
    args: {
        value: 0,
        placeholder: "Placeholder",
        disabled: false,
        iconProps: {
            icon: IconType.MENU
        },
        minValue: 0
    },
    argTypes: {
    },
};

export default meta;

export const Default: StoryObj<typeof NumberBox> = {
    render: (args) => {
        const [value, setValue] = useState<number|undefined>(0);
        return <NumberBox
            {...args}
            controlled={true}
            value={value}
            onChange={(val) => {
                setValue(val);
            }}
        />
    },
    args: {}
};