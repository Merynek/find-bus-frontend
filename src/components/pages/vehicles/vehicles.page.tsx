"use client";

import React from "react";
import {VehicleDetail} from "../../compositions/vehicle/detail-list/vehicle-detail-list";
import {ButtonClick, ButtonLink, ButtonSize, ButtonType} from "../../components/button/button";
import {VehicleResponseDto} from "@/src/api/openapi";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {ROUTES} from "@/src/enums/router.enum";

export interface IVehiclePageProps {
    vehicles: VehicleResponseDto[];
}

const VehiclePage = (props: IVehiclePageProps) => {
    const vehicles = props.vehicles.map(VehicleConverter.toInstance);

    const _renderList = () => {
        return <div>
            <ButtonClick
                controlled={true}
                onClick={() => {
                    // TODO: create new vehicle
                }}
                label={"Add new"}
                type={ButtonType.YELLOW}
                size={ButtonSize.BY_CONTENT}
            />
            {vehicles.map((vehicle => {
                return <div key={vehicle.id}>
                    <VehicleDetail
                        vehicle={vehicle}
                    />
                    <ButtonLink
                        route={{
                            route: ROUTES.VEHICLE_DETAIL,
                            params: { vehicleId: vehicle.id.toString() }
                        }}
                        label={"EDIT"}
                        type={ButtonType.BLACK}
                        size={ButtonSize.BUTTON_SIZE_M}
                    />
                </div>
            }))}
        </div>
    }

    return <div className={"layout"}>
        {_renderList()}
    </div>
};

export default VehiclePage;