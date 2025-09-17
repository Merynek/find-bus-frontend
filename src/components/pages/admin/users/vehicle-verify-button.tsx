"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {VehicleService} from "@/src/services/VehicleService";
import {VehicleResponseDto} from "@/src/api/openapi";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {useRouter} from "@/src/i18n/navigation";

interface IVehicleVerifyButtonProps {
    vehicle: VehicleResponseDto;
}

export const VehicleVerifyButton = (props: IVehicleVerifyButtonProps) => {
    const vehicle = VehicleConverter.toInstance(props.vehicle);
    const router = useRouter();

    return <ButtonClick
        controlled={true}
        size={ButtonSize.BY_CONTENT}
        label={vehicle.isVerifiedForTransporting ? "Označit Vehicle jako neoveřený" : "Označit Vehicle jako oveřený"}
        onClick={async () => {
            if (vehicle.id) {
                await VehicleService.setVehicleVerification(vehicle.id, !vehicle.isVerifiedForTransporting);
                router.refresh();
            }
        }}
        type={ButtonType.BLACK}
    />
};