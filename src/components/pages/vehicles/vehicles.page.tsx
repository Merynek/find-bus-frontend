"use client";

import React, {useState} from "react";
import {VehicleDetail} from "../../compositions/vehicle/detail-list/vehicle-detail-list";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {VehicleEditStore} from "../../compositions/vehicle/edit/vehicle-edit.store";
import {Vehicle} from "@/src/data/users/vehicle";
import {VehicleService} from "@/src/services/VehicleService";
import {useApp} from "@/src/app/contexts/AppContext";
import VehicleForm from "@/src/components/compositions/vehicle/edit/vehicle-edit";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {VehicleResponseDto} from "@/src/api/openapi";
import {VehicleConverter} from "@/src/converters/vehicle-converter";

interface IVehiclePageProps {
    vehicles: VehicleResponseDto[];
}

const VehiclePage = (props: IVehiclePageProps) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(props.vehicles.map(VehicleConverter.toInstance));
    const {showLoader, hideLoader} = useApp();
    const [vehicleEdit, setVehicleEdit] = useState<VehicleEditStore|null>(null);
    const locale = useCurrentLocale();

    const _renderEdit = (editVehicle: VehicleEditStore) => {
        return <VehicleForm
            store={editVehicle}
            onClose={async () => {
                showLoader();
                setVehicleEdit(null);
                const vehicles = await VehicleService.getVehicles(locale);
                setVehicles(vehicles);
                hideLoader();
            }}
        />
    }

    const _renderList = () => {
        return <div>
            <ButtonClick
                onClick={() => {
                    setVehicleEdit(new VehicleEditStore({
                        vehicle: Vehicle.create()
                    }))
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
                    <ButtonClick
                        onClick={() => {
                            setVehicleEdit(new VehicleEditStore({
                                vehicle: vehicle
                            }));
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
        {vehicleEdit ? _renderEdit(vehicleEdit) : _renderList()}
    </div>
};

export default VehiclePage;