"use client";

import React from "react";
import styles from "./email-config-item.module.scss";
import {EmailConfigLocalization, EmailTemplate} from "@/src/data/emailConfig";
import {emailConfigFormAction} from "@/src/app/actions/forms/admin/emailConfig/emailConfigFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import type {EmailTemplateResponseDto} from "@/src/api/openapi";
import {EmailTemplateConverter} from "@/src/converters/admin/email-template-converter";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {useFormActionState} from "@/src/hooks/formHook";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";

interface IEmailConfigItemProps {
    tmp: EmailTemplateResponseDto;
}

export const EmailConfigItem = (props: IEmailConfigItemProps) => {
    const {tmp} = props;
    const emailTemplate = EmailTemplateConverter.toInstance(tmp);

    const _renderParams = (config: EmailTemplate) => {
        const params: React.ReactNode[] = [];
        config.params.forEach((value: string, key: string) => {
            params.push(<LayoutFlexColumn gap={FlexGap.TINY_8} key={key}>
                <LayoutFlexRow gap={FlexGap.TINY_8}>
                    <Text text={key} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD}/>
                    <Text text={": "} fontSize={FontSize.BASE_14}/>
                    <Text text={value} fontSize={FontSize.BASE_14}/>
                </LayoutFlexRow>
            </LayoutFlexColumn>)
        });
        return params;
    }

    return <div className={styles.layout}>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            <Text text={emailTemplate.type.toString()} fontSize={FontSize.M_24} />
            <div className={styles.params}>
                {_renderParams(emailTemplate)}
            </div>
            <LayoutFlexColumn gap={FlexGap.TINY_8}>
                {emailTemplate.localizations.map((localization, i) => {
                    return <EmailConfigLocalizationItem
                        key={i}
                        template={emailTemplate}
                        localization={localization}
                    />
                })}
            </LayoutFlexColumn>
        </LayoutFlexColumn>
    </div>
};

interface IEmailConfigLocalizationItemProps {
    template: EmailTemplate;
    localization: EmailConfigLocalization;
}

export const EmailConfigLocalizationItem = (props: IEmailConfigLocalizationItemProps) => {
    const {localization, template} = props;
    const [state, action, pending] = useFormActionState(emailConfigFormAction, {
        data: {
            language: localization.language,
            template: template.type,
            templateId: localization.templateId
        }
    })

    return <form action={action}>
        <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            <FormStatus state={state}/>
            <input type="hidden" name={FormDataEnum.language} value={state?.data?.language}/>
            <input type="hidden" name={FormDataEnum.template} value={state?.data?.template}/>
            <LayoutFlexRow>
                <Text text={`Language: ${localization.language}`} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
            </LayoutFlexRow>
            <LayoutFlexRow gap={FlexGap.TINY_8}>
                <NumberBox
                    placeholder={"Id template:"}
                    controlled={false}
                    id={FormDataEnum.templateId}
                    name={FormDataEnum.templateId}
                    defaultValue={state?.data?.templateId || 0}
                    minValue={0}
                />
                <ButtonClick
                    controlled={false}
                    size={ButtonSize.BUTTON_SIZE_M}
                    type={ButtonType.BLACK}
                    isDisabled={pending}
                    label={"Change"}
                />
            </LayoutFlexRow>
        </LayoutFlexColumn>
    </form>
}