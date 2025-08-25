import React from "react";
import {Meta, StoryObj} from "@storybook/nextjs";
import {PageTabs} from "@/src/components/compositions/page-tabs/page-tabs";

const meta: Meta<typeof PageTabs> = {
    component: PageTabs,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof PageTabs> = {
    render: (args) => <PageTabs
        {...args}
    />,
    args: {}
};