import React from "react";
import AdminUsersPage from "./admin-users.page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: AdminUsersPage,
    args: {}
};

export const AdminUsersPageStory: StoryObj = {
    render: () => <AdminUsersPage
        users={[]}
    />,
    args: {}
};