import React from "react";
import styles from "./email-config.page.module.scss";
import {EmailConfigItem} from "../../../compositions/admin/email-config-item/email-config-item";
import type {EmailConfigResponseDto} from "@/src/api/openapi";

interface IEmailConfigPageProps {
    cfg: EmailConfigResponseDto;
}

const EmailConfigPage = async (props: IEmailConfigPageProps) => {
    const {cfg} = props;

    return <div className={styles.layout}>
        {cfg.templates.map((e, i) => <div
            className={styles.item} key={i}>
            <EmailConfigItem
                key={i}
                tmp={e}
            />
        </div>)}
    </div>
};

export default EmailConfigPage;