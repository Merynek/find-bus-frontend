import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {getRandomUserAdminDetail} from "@/dataGenerator/user";
import {getRandomAppBusinessConfig} from "@/dataGenerator/appBusinessConfig";
import {AdminUserDetail} from "@/src/components/compositions/admin/admin-user-detail/admin-user-detail";

const meta: Meta<typeof AdminUserDetail> = {
    component: AdminUserDetail,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminUserDetail> = {
    render: (args) => <AdminUserDetail
        {...args}
        user={getRandomUserAdminDetail()}
        config={getRandomAppBusinessConfig()}
    />
};