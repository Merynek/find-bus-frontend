"use client";

import React from "react";
import styles from "./email-config-item.module.scss";
import {EmailTemplate} from "@/src/data/emailConfig";
import {emailConfigFormAction} from "@/src/app/actions/forms/admin/emailConfig/emailConfigFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import type {EmailTemplateResponseDto} from "@/src/api/openapi";
import {EmailTemplateConverter} from "@/src/converters/admin/email-template-converter";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {useFormActionState} from "@/src/hooks/formHook";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";

export interface IEmailConfigItemProps {
    tmp: EmailTemplateResponseDto;
}

export const EmailConfigItem = (props: IEmailConfigItemProps) => {
    const [state, action, pending] = useFormActionState(emailConfigFormAction, undefined)
    const {tmp} = props;
    const emailTemplate = EmailTemplateConverter.toInstance(tmp);

    const _renderParams = (config: EmailTemplate) => {
        const params: React.ReactNode[] = [];
        config.params.forEach((value: string, key: string) => {
            params.push(<div key={key}>
                <span>{key}: </span>
                <span>{value}</span>
            </div>);
        });
        return params;
    }

    return <div className={styles.layout}>
        <div className={styles.header}>{emailTemplate.type.toString()}</div>
        <div className={styles.params}>
            {_renderParams(emailTemplate)}
        </div>
        <div>
            {emailTemplate.localizations.map((localization, i) => {
                return <React.Fragment key={i}>
                    <form action={action}>
                        <FormStatus state={state} />
                        <input type="hidden" name={FormDataEnum.language} value={localization.language}/>
                        <input type="hidden" name={FormDataEnum.template} value={emailTemplate.type}/>
                        <div>
                            <span>Language:</span>
                            <span>{localization.language}</span>
                        </div>
                        <div className={styles.templateId}>
                            <NumberBox
                                placeholder={"Id template:"}
                                controlled={false}
                                id={FormDataEnum.templateId}
                                name={FormDataEnum.templateId}
                                defaultValue={localization.templateId || 0}
                                minValue={0}
                            />
                            <ButtonClick
                                controlled={false}
                                size={ButtonSize.BUTTON_SIZE_M}
                                type={ButtonType.BLACK}
                                isDisabled={pending}
                                label={"Change"}
                            />
                        </div>
                    </form>
                </React.Fragment>
            })}
        </div>
    </div>
};