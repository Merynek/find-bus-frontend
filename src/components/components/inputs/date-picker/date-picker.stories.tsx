import React from "react";
import {DatePicker, IDatePickerProps} from "./date-picker";
import {Meta, StoryObj} from "@storybook/nextjs";
import {addDays, minusDays} from "@/src/utils/date-time.common";

export default {
    component: DatePicker,
    args: {
        disabled: false,
        onChange: () => {},
        placeholderText: "Date Picker",
        showTimeSelect: false,
        maxDate: addDays(new Date(), 20),
        minDate: minusDays(new Date(), 20),
        selected: new Date()
    },
} as Meta<IDatePickerProps>;

export const DatePickerStory: StoryObj<IDatePickerProps> = {
    render: (args) => <DatePicker
        {...args}
    />,
    args: {}
};