import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {Logo} from "@/src/components/components/logo/logo";

const meta: Meta<typeof Logo> = {
    component: Logo,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof Logo>  = {
    render: () => {
        return <Logo />
    }
};
