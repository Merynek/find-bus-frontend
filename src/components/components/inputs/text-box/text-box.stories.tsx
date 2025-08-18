import {IMultiLineResize, TextBox, TextBoxType} from "./text-box";
import React, {useState} from "react";
import {InputSize} from "../inputEnum";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof TextBox> = {
    component: TextBox,
    args: {
        value: '',
        placeholder: "Placeholder",
        size: InputSize.MEDIUM,
        disabled: false,
        type: TextBoxType.TEXT
    },
    argTypes: {
        type: {
            options: Object.values(TextBoxType),
            control: { type: 'select' }
        },
        size: {
            options: Object.values(InputSize),
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
            multiLine={{rows: 5, resize: IMultiLineResize.NONE}}
        />
    },
    args: {}
};