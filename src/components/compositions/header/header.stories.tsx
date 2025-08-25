import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {Header} from "@/src/components/compositions/header/header";

const meta: Meta<typeof Header> = {
    component: Header,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof Header> = {
    render: () => <Header />
};