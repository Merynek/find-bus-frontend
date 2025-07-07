import React from "react";
import AdminUsersPage, {IAdminUsersPageProps} from "./admin-users.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: AdminUsersPage,
    args: {}
} as Meta<IAdminUsersPageProps>;

export const AdminUsersPageStory: StoryObj<IAdminUsersPageProps> = {
    render: (args) => <AdminUsersPage {...args} />,
    args: {}
};