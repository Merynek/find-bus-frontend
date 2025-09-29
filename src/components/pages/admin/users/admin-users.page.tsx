import React from "react";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {AdminUserItem} from "@/src/components/compositions/admin/admin-user-item/admin-user-item";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";

export interface IUsersListParams {
    users: UserAdminDetail[];
    config: AppBusinessConfig;
}

const AdminUsersPage = (props: IUsersListParams) => {
    const {users, config} = props;

    return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
        {users.map((user) => {
            return <AdminUserItem
                key={user.id}
                user={user}
                config={config}
            />
        })}
    </LayoutFlexColumn>
};

export default AdminUsersPage;