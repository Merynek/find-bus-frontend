import React from "react";
import {Header} from "./header";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: Header,
    args: {}
};

export const HeaderStory: StoryObj = {
    render: (args) => <Header {...args} />,
    args: {}
};