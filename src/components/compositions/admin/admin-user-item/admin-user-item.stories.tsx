import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {AdminUserItem} from "@/src/components/compositions/admin/admin-user-item/admin-user-item";
import {getRandomUserAdminDetail} from "@/dataGenerator/user";
import {getRandomAppBusinessConfig} from "@/dataGenerator/appBusinessConfig";

const meta: Meta<typeof AdminUserItem> = {
    component: AdminUserItem,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminUserItem> = {
    render: (args) => <AdminUserItem
        {...args}
        user={getRandomUserAdminDetail()}
        config={getRandomAppBusinessConfig()}
    />
};