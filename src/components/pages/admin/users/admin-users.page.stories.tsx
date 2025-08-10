import React from "react";
import AdminUsersPage from "./admin-users.page";
import {Meta, StoryObj} from "@storybook/react";

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