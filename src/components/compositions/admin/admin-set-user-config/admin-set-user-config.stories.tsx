import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {AdminSetUserConfig} from "@/src/components/compositions/admin/admin-set-user-config/admin-set-user-config";
import {getRandomId} from "@/dataGenerator/tools";
import {getRandomUserConfig} from "@/dataGenerator/userConfig";

const meta: Meta<typeof AdminSetUserConfig> = {
    component: AdminSetUserConfig,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminSetUserConfig> = {
    render: (args) => <AdminSetUserConfig
        {...args}
        userId={getRandomId()}
        config={getRandomUserConfig()}
    />
};