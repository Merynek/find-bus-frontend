import React from "react";
import AdminUsersPage from "./admin-users.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomUserAdminDetail} from "@/dataGenerator/user";
import {getRandomAppBusinessConfig} from "@/dataGenerator/appBusinessConfig";

const meta: Meta<typeof AdminUsersPage> = {
    component: AdminUsersPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof AdminUsersPage> = {
    render: () => <AdminUsersPage
        users={[getRandomUserAdminDetail()]}
        config={getRandomAppBusinessConfig()}
    />,
    args: {}
};