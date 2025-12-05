import React from "react";
import {AdminUserItem} from "@/src/components/compositions/admin/admin-user-item/admin-user-item";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {UserAdminItem} from "@/src/data/users/user-admin-item";

export interface IUsersListParams {
    users: UserAdminItem[];
}

const AdminUsersPage = (props: IUsersListParams) => {
    const {users} = props;

    return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
        {users.map((user) => {
            return <AdminUserItem
                key={user.id}
                user={user}
            />
        })}
    </LayoutFlexColumn>
};

export default AdminUsersPage;