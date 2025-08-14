import React from "react";
import {Header} from "./header";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: Header,
    args: {}
};

export const HeaderStory: StoryObj = {
    render: (args) => <Header {...args} />,
    args: {}
};