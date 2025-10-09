import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FlexGap} from "@/src/enums/layout.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {
    adminVehicleVerificationFormAction
} from "@/src/server-actions/forms/admin/vehicle/adminVehicleVerificationFormAction";
import {CheckBox} from "@/src/components/components/inputs/check-box/check-box";

interface IVehicleVerificationProps {
    vehicle: Vehicle;
}

const VehicleVerification = (props: IVehicleVerificationProps) => {
    const {vehicle} = props;
    const { t } = useTranslate("page.adminVehicle");
    const [state, action, pending] = useFormActionState(adminVehicleVerificationFormAction, {
        data: {
            vehicleId: vehicle.id,
            verified: false,
            description: vehicle.verificationFeedback?.description || ""
        }
    });
    const locale = useCurrentLocale();

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <form action={action}>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state}/>
                <input type="hidden" name={FormDataEnum.vehicleId} value={vehicle.id}/>
                <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
                <TextBox
                    placeholder={t("feedbackLabel")}
                    controlled={false}
                    type={TextBoxType.TEXT}
                    name={FormDataEnum.description}
                    id={FormDataEnum.description}
                    defaultValue={state?.data?.description || ""}
                />
                <CheckBox
                    controlled={false}
                    name={FormDataEnum.verified}
                    id={FormDataEnum.verified}
                    label={t("isApproved")}
                    defaultChecked={state?.data?.verified || false}
                />
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    isDisabled={pending}
                    label={t("submit")}
                />
            </LayoutFlexColumn>
        </form>
    </LayoutFlexColumn>
};

export default VehicleVerification;
