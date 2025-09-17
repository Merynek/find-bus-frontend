import React from "react";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {AdminUserItem} from "@/src/components/compositions/admin/admin-user-item/admin-user-item";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";

export interface IUsersListParams {
    users: UserAdminDetail[];
}

const AdminUsersPage = (props: IUsersListParams) => {
    const {users} = props;

    return <LayoutFlexColumn>
        {users.map((user) => {
            return <AdminUserItem key={user.id} user={user} />
        })}
    </LayoutFlexColumn>
};

export default AdminUsersPage;