"use client";

import React, {useRef} from "react";
import styles from "./email-config.page.module.scss";
import {observer} from "mobx-react";
import {EmailConfigPageStore} from "./email-config.page.store";
import {EmailConfigItem} from "../../../compositions/admin/email-config-item/email-config-item";

const EmailConfigPage = observer(() => {
    const _storeRef = useRef<EmailConfigPageStore>(new EmailConfigPageStore({}));
    const _locKey = "page.emailConfig."

    const _renderUserParams = () => {
        let params: React.ReactNode[] = [];
        _storeRef.current.emailConfig && _storeRef.current.emailConfig.userParams.forEach((value: string, key: string) => {
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
        {_storeRef.current.emailConfig && _storeRef.current.emailConfig.templates.map((e, i) => <div className={styles.item} key={i}>
            <EmailConfigItem
                key={i}
                emailTemplate={e}
                onSubmitTemplate={(loc) => {
                    _storeRef.current.updateConfig(e, loc);
                }}
            />
        </div>)}
    </div>
});

export default EmailConfigPage;