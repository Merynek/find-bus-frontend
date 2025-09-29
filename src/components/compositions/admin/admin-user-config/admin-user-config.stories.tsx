import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {getRandomUserAdminDetail} from "@/dataGenerator/user";
import {UserAdminDetailConverter} from "@/src/converters/admin/user-admin-detail-converter";
import {AdminUserConfig} from "@/src/components/compositions/admin/admin-user-config/admin-user-config";

const meta: Meta<typeof AdminUserConfig> = {
    component: AdminUserConfig,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminUserConfig> = {
    render: (args) => <AdminUserConfig
        {...args}
        user={UserAdminDetailConverter.toJson(getRandomUserAdminDetail())}
    />
};