"use client";

import {useTranslate} from "@/src/hooks/translateHook";
import React, {useRef, useState} from "react";
import styles from "./vehicles.page.module.scss";
import {observer} from "mobx-react";
import {VehiclesPageStore} from "./vehicles.page.store";
import {VehicleDetail} from "../../compositions/vehicle/detail-list/vehicle-detail-list";
import {VehicleEdit} from "../../compositions/vehicle/edit/vehicle-edit";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {VehicleEditStore} from "../../compositions/vehicle/edit/vehicle-edit.store";
import {useBean} from "ironbean-react";
import {AppManager} from "@/src/singletons/app-manager";
import {Vehicle} from "@/src/data/users/vehicle";

const VehiclePage = observer(() => {
    const _storeRef = useRef<VehiclesPageStore>(new VehiclesPageStore());
    const store = _storeRef.current;
    const _locKey = "page.vehicles."
    const {t} = useTranslate();
    const _appManager = useBean(AppManager);
    const [vehicleEdit, setVehicleEdit] = useState<VehicleEditStore|null>(null);

    const _renderEdit = (editVehicle: VehicleEditStore) => {
        return <VehicleEdit
            store={editVehicle}
            onClose={async () => {
                _appManager.loading = true;
                setVehicleEdit(null);
                store.vehicles = [];
                await store.load();
                _appManager.loading = false;
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
            {store.vehicles.map((vehicle => {
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
});

export default VehiclePage;