import React, {useRef} from "react";
import {ComboBox, IComboBoxItem, IComboBoxProps} from "./combo-box";
import {Meta, StoryObj} from "@storybook/react";
import {getRandomText} from "@/dataGenerator/texts/texts";

interface IData extends IComboBoxItem<string> {
    label: string;
    value: string;
}

export default {
    component: ComboBox,
    args: {
        onChange: () => {},
        disabled: false,
        placeHolder: getRandomText(1)
    }
} as Meta<IComboBoxProps<string>>;

export const ComboBoxStory: StoryObj<IComboBoxProps<string>> = {
    render: (args) => {
        const initData = useRef<IData[]>([
            { value: "1", label: "aaaa"},
            { value: "2", label: "bbbb"},
            { value: "3", label: "cccc"},
            { value: "4", label: "dddd"},
            { value: "5", label: "eeee"},
        ]);

        return <ComboBox
            {...args}
            items={initData.current}
        />
    },
    args: {}
};