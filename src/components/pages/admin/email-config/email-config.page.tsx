import React from "react";
import {EmailConfigItem} from "../../../compositions/admin/email-config-item/email-config-item";
import {EmailConfig} from "@/src/data/emailConfig";
import {EmailTemplateConverter} from "@/src/converters/admin/email-template-converter";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";

interface IEmailConfigPageProps {
    cfg: EmailConfig;
}

const EmailConfigPage = async (props: IEmailConfigPageProps) => {
    const {cfg} = props;

    return <LayoutFlexColumn gap={FlexGap.TINY_8}>
        {cfg.templates.map((e, i) => <EmailConfigItem
            key={i}
            tmp={EmailTemplateConverter.toJson(e)}
        />)}
    </LayoutFlexColumn>
};

export default EmailConfigPage;