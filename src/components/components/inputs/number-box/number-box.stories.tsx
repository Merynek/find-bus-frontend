import React, {useEffect, useState} from "react";
import {INumberBoxProps, NumberBox} from "./number-box";
import {InputSize} from "../inputEnum";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: NumberBox,
    args: {
        placeholder: "placeholder",
        size: InputSize.LARGE,
        disabled: false,
        hideTopPlaceholder: false,
        hideSpinButtons: false,
        formatter: ""
    },
} as Meta<INumberBoxProps>;

export const NumberBoxStory: StoryObj<INumberBoxProps> = {
    render: (args) => {
        const [value, setValue] = useState<number | undefined>(args.value);

        useEffect(() => {
            setValue(args.value)

        }, [args.value])

        return <NumberBox
            {...args}
            value={value}
            onChange={setValue}
        />
    },
    args: {}
};