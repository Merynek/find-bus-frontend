import React, {useState} from "react";
import {CheckBox} from "./check-box";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomText} from "@/dataGenerator/texts/texts";

const meta: Meta<typeof CheckBox> = {
    component: CheckBox,
    args: {
        disabled: false,
        label: getRandomText(1)
    },
};

export default meta;

export const Default: StoryObj<typeof CheckBox> = {
    render: (args) => {
        const [value, setValue] = useState<boolean>(true);
        return <CheckBox
            {...args}
            controlled={true}
            value={value}
            onChange={() => {
                setValue(!value);
            }}
        />
    },
    args: {}
};