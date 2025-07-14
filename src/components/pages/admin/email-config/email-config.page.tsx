import React from "react";
import styles from "./email-config.page.module.scss";
import {EmailConfigItem} from "../../../compositions/admin/email-config-item/email-config-item";
import {AdminService} from "@/src/services/AdminService";

const EmailConfigPage = async () => {
    const config = await AdminService.getEmailConfig();

    const _renderUserParams = () => {
        const params: React.ReactNode[] = [];
        config.userParams.forEach((value: string, key: string) => {
            params.push(<div key={value}>
                <span>{key} : </span>
                <span>{value}</span>
            </div>);
        });
        return params;
    }

    return <div className={styles.layout}>
        <div className={styles.userParams}>
            <h2>User Params</h2>
            {_renderUserParams()}
        </div>
        {config.templates.map((e, i) => <div
            className={styles.item} key={i}>
            <EmailConfigItem
                key={i}
                emailTemplate={e}
            />
        </div>)}
    </div>
};

export default EmailConfigPage;