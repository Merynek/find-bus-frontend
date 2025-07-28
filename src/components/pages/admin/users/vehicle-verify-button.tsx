"use client";

import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {VehicleService} from "@/src/services/VehicleService";
import {VehicleResponseDto} from "@/src/api/openapi";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {useInit} from "@/src/hooks/lifecycleHooks";

interface IVehicleVerifyButtonProps {
    vehicle: VehicleResponseDto;
}

export const VehicleVerifyButton = (props: IVehicleVerifyButtonProps) => {
    const vehicle = useInit(() => VehicleConverter.toInstance(props.vehicle));

    return <ButtonClick
        size={ButtonSize.BY_CONTENT}
        label={vehicle.isVerifiedForTransporting ? "Označit Vehicle jako neoveřený" : "Označit Vehicle jako oveřený"}
        onClick={async () => {
            await VehicleService.setVehicleVerification(vehicle.id, !vehicle.isVerifiedForTransporting);
        }}
        type={ButtonType.YELLOW}
    />
};