import React from "react";
import {Header, IHeaderProps} from "./header";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: Header,
    args: {}
} as Meta<IHeaderProps>;

export const HeaderStory: StoryObj<IHeaderProps> = {
    render: (args) => <Header {...args} />,
    args: {}
};