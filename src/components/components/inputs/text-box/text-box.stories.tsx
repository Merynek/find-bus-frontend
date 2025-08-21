import {TextBox, TextBoxType} from "./text-box";
import React, {useState} from "react";
import {Meta, StoryObj} from "@storybook/nextjs";
import {IconType} from "@/src/enums/icon.enum";

const meta: Meta<typeof TextBox> = {
    component: TextBox,
    args: {
        value: '',
        placeholder: "Placeholder",
        disabled: false,
        type: TextBoxType.TEXT,
        iconProps: {
            icon: IconType.MENU
        }
    },
    argTypes: {
        type: {
            options: Object.values(TextBoxType),
            control: { type: 'select' }
        }
    },
};

export default meta;

export const Default: StoryObj<typeof TextBox> = {
    render: (args) => {
        const [value, setValue] = useState<string>("");
        return <TextBox
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

export const MultiLine: StoryObj<typeof TextBox> = {
    render: (args) => {
        const [value, setValue] = useState<string>("");

        return <TextBox
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