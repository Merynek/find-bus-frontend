import {IMultiLineResize, TextBox, TextBoxType, ITextBoxProps} from "./text-box";
import React, {useState} from "react";
import {InputSize} from "../inputEnum";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
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
        },
        resize: {
            options: Object.values(IMultiLineResize),
            control: { type: 'select' }
        }
    },
} as Meta<ITextBoxProps>;

export const TextBoxStory: StoryObj<ITextBoxProps> = {
    render: (args) => {
        const [value, setValue] = useState<string>("");
        return  <TextBox
            {...args}
            value={value}
            onChange={(val) => {
                setValue(val);
            }}
        />
    },
    args: {}
};

export const MultiLineStory: StoryObj<ITextBoxProps> = {
    render: (args) => {
        const [value, setValue] = useState<string>("");

        return <TextBox
            {...args}
            value={value}
            onChange={(val) => {
                setValue(val);
            }}
            multiLine={{rows: 5, resize: IMultiLineResize.NONE}}
        />
    }
}