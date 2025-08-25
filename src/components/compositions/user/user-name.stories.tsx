import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {UserName} from "@/src/components/compositions/user/user-name";
import {getRandomUser} from "@/dataGenerator/user";

const meta: Meta<typeof UserName> = {
    component: UserName,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof UserName> = {
    render: (args) => <UserName
        {...args}
        user={getRandomUser()}
    />,
    args: {}
};