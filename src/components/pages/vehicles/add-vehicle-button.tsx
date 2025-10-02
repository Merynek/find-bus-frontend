"use client";

import React, {useState} from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {VehicleService} from "@/src/services/VehicleService";
import {useRouter} from "@/src/i18n/navigation";

const AddVehicleButton = () => {
    const router = useRouter();
    const [disabled, setDisabled] = useState(false);

    return <ButtonClick
        controlled={true}
        isDisabled={disabled}
        onClick={async () => {
            setDisabled(true);
            try {
                const vehicleId = await VehicleService.addVehicle({
                    vehicle: {}
                });
                router.push({
                    pathname: ROUTES.VEHICLE_EDIT,
                    params: {
                        vehicleId: vehicleId.toString()
                    }
                });
            } catch (e: unknown) {
                // error
            }
            setDisabled(false);
        }}
        label={"Add new vehicle"}
        type={ButtonType.YELLOW}
        size={ButtonSize.BY_CONTENT}
    />
};

export default AddVehicleButton;