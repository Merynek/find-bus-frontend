import React from "react";
import {ComboBox, IComboBoxItem} from "./combo-box";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {useInit} from "@/src/hooks/lifecycleHooks";

interface IData extends IComboBoxItem<string> {
    label: string;
    value: string;
}

const meta: Meta<typeof ComboBox> = {
    component: ComboBox,
    args: {
        onChange: () => {},
        disabled: false,
        placeHolder: getRandomText(1)
    },
    argTypes: {
    },
};

export default meta;

export const Default: StoryObj<typeof ComboBox> = {
    render: (args) => {
        const initData = useInit<IData[]>(() => ([
            { value: "1", label: "aaaa"},
            { value: "2", label: "bbbb"},
            { value: "3", label: "cccc"},
            { value: "4", label: "dddd"},
            { value: "5", label: "eeee"},
        ]));

        return <ComboBox
            {...args}
            items={initData}
        />
    },
    args: {}
};