import React from "react";
import styles from "./email-config-item.module.scss";
import {observer} from "mobx-react";
import {EmailConfigLocalization, EmailTemplate} from "@/src/data/emailConfig";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {runInAction} from "mobx";
import {InputSize} from "../../../components/inputs/inputEnum";
import {NumberBox} from "../../../components/inputs/number-box/number-box";

export interface IEmailConfigItemProps {
    emailTemplate: EmailTemplate;
    onSubmitTemplate: (localization: EmailConfigLocalization) => void;
}

export const EmailConfigItem = observer((props: IEmailConfigItemProps) => {
    const {emailTemplate, onSubmitTemplate} = props;

    const _renderParams = (config: EmailTemplate) => {
        let params: React.ReactNode[] = [];
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
                    <div>
                        <span>Language:</span>
                        <span>{localization.language}</span>
                    </div>
                    <div className={styles.templateId}>
                        <span>Id template:</span>
                        <NumberBox
                            value={localization.templateId}
                            minValue={0}
                            onChange={(val) => {
                                runInAction(() => {
                                    if (val !== undefined) {
                                        localization.templateId = val
                                    } else {
                                        localization.templateId = 0;
                                    }
                                })
                            }}
                            size={InputSize.MEDIUM}
                            hideSpinButtons
                        />
                        <ButtonClick
                            onClick={() => {
                                onSubmitTemplate(localization);
                            }}
                            label={"Change"}
                            type={ButtonType.YELLOW}
                            size={ButtonSize.BY_CONTENT}
                        />
                    </div>
                </React.Fragment>
            })}
        </div>
    </div>
});