import React from "react";
import {EmailConfigItem} from "../../../compositions/admin/email-config-item/email-config-item";
import {EmailConfig} from "@/src/data/emailConfig";
import {EmailTemplateConverter} from "@/src/converters/admin/email-template-converter";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";

interface IEmailConfigPageProps {
    cfg: EmailConfig;
}

const EmailConfigPage = async (props: IEmailConfigPageProps) => {
    const {cfg} = props;

    return <LayoutFlexRow gap={FlexGap.TINY_8} canWrap={true}>
        {cfg.templates.map((e, i) => <EmailConfigItem
            key={i}
            tmp={EmailTemplateConverter.toJson(e)}
        />)}
    </LayoutFlexRow>
};

export default EmailConfigPage;