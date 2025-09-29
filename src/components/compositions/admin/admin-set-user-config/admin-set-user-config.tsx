import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {FlexGap} from "@/src/enums/layout.enum";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {userConfigFormAction} from "@/src/server-actions/forms/admin/userlConfig/userConfigFormAction";
import {UserConfig} from "@/src/data/userConfig";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";

interface IAdminSetUserConfigProps {
    userId: number;
    appConfig: AppBusinessConfig;
    userConfig?: UserConfig;
}

export const AdminSetUserConfig = (props: IAdminSetUserConfigProps) => {
    const {userId, userConfig, appConfig} = props;
    const [state, action, pending] = useFormActionState(userConfigFormAction, {
        data: {
            userId: userId,
            tripOfferCommissionPercentage: userConfig ? userConfig.tripOfferCommissionPercentage : appConfig.tripOfferCommissionPercentage
        }
    })

    return <form action={action}>
        <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            <FormStatus state={state}/>
            <input type="hidden" name={FormDataEnum.userId} value={userId}/>
            <LayoutFlexColumn gap={FlexGap.TINY_8}>
                <NumberBox
                    placeholder={"Commission Percentage:"}
                    controlled={false}
                    id={FormDataEnum.tripOfferCommissionPercentage}
                    name={FormDataEnum.tripOfferCommissionPercentage}
                    defaultValue={state?.data?.tripOfferCommissionPercentage || appConfig.tripOfferCommissionPercentage}
                    minValue={0}
                />
            </LayoutFlexColumn>
            <ButtonClick
                controlled={false}
                size={ButtonSize.BUTTON_SIZE_M}
                type={ButtonType.BLACK}
                isDisabled={pending}
                label={"Update config"}
            />
        </LayoutFlexColumn>
    </form>
}