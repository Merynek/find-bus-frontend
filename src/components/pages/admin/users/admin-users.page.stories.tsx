import React from "react";
import AdminUsersPage from "./admin-users.page";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof AdminUsersPage> = {
    component: AdminUsersPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof AdminUsersPage> = {
    render: () => <AdminUsersPage
        users={[]}
    />,
    args: {}
};