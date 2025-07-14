"use client";

import React, {useActionState} from "react";
import styles from "./email-config-item.module.scss";
import {EmailTemplate} from "@/src/data/emailConfig";
import {emailConfigFormAction} from "@/src/app/actions/forms/admin/emailConfig/emailConfigFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";

export interface IEmailConfigItemProps {
    emailTemplate: EmailTemplate;
}

export const EmailConfigItem = (props: IEmailConfigItemProps) => {
    const [state, action, pending] = useActionState(emailConfigFormAction, undefined)

    const {emailTemplate} = props;

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
                        <input type="hidden" name={FormDataEnum.language} value={localization.language}/>
                        <input type="hidden" name={FormDataEnum.template} value={emailTemplate.type}/>
                        <div>
                            <span>Language:</span>
                            <span>{localization.language}</span>
                        </div>
                        <div className={styles.templateId}>
                            <span>Id template:</span>
                            <div>
                                <label htmlFor={FormDataEnum.templateId}>Id template:</label>
                                <input id={FormDataEnum.templateId} name={FormDataEnum.templateId} type={"number"}/>
                            </div>
                            {state?.errors?.templateId && <p>{state.errors.templateId}</p>}
                            <button disabled={pending} type="submit">
                                Change
                            </button>
                        </div>
                    </form>
                </React.Fragment>
            })}
        </div>
    </div>
};