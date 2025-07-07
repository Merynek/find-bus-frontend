import {TripFilter, ITripFilterProps} from "./trip-filter";
import React from "react";
import {TripFilterStore} from "./trip-filter.store";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripFilter,
    args: {
        onSubmit: () => {},
    }
} as Meta<ITripFilterProps>;

export const TripFilterStory: StoryObj<ITripFilterProps> = {
    render: (args) => <TripFilter
        {...args}
        filter={new TripFilterStore()}
    />,
    args: {}
};