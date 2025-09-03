import React from "react";
import {DatePicker} from "./date-picker";
import {Meta, StoryObj} from "@storybook/nextjs";
import {addDays, minusDays} from "@/src/utils/date-time.common";

const meta: Meta<typeof DatePicker> = {
    component: DatePicker,
    args: {
        disabled: false,
        onChange: () => {},
        placeholderText: "Date Picker",
        showTimeSelect: false,
        maxDate: addDays(new Date(), 20),
        minDate: minusDays(new Date(), 20)
    },
    argTypes: {
    },
};

export default meta;

export const Default: StoryObj<typeof DatePicker> = {
    render: (args) => {
        return <DatePicker
            {...args}
        />
    },
    args: {}
};