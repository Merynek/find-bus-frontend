import React from "react";
import styles from "./email-config.page.module.scss";
import {EmailConfigItem} from "../../../compositions/admin/email-config-item/email-config-item";
import {EmailConfig} from "@/src/data/emailConfig";
import {EmailTemplateConverter} from "@/src/converters/admin/email-template-converter";

interface IEmailConfigPageProps {
    cfg: EmailConfig;
}

const EmailConfigPage = async (props: IEmailConfigPageProps) => {
    const {cfg} = props;

    return <div className={styles.layout}>
        {cfg.templates.map((e, i) => <div
            className={styles.item} key={i}>
            <EmailConfigItem
                key={i}
                tmp={EmailTemplateConverter.toJson(e)}
            />
        </div>)}
    </div>
};

export default EmailConfigPage;