import React from "react";
import {Vehicle} from "@/src/data/users/vehicle";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehicleService} from "@/src/services/VehicleService";
import VehicleForm from "@/src/components/compositions/vehicle/edit/vehicle-edit";
import {VehicleEditStore} from "@/src/components/compositions/vehicle/edit/vehicle-edit.store";

interface IVehicleEditPageProps {
    vehicle: Vehicle;
}

const VehicleEditPage = (props: IVehicleEditPageProps) => {
    const { vehicle } = props;
    const store = new VehicleEditStore({
        vehicle: vehicle
    });

    return <LayoutFlexColumn>
        <VehicleForm
            store={store}
            onClose={async () => {
                showLoader();
                setVehicleEdit(null);
                const vehicles = await VehicleService.getVehicles();
                setVehicles(vehicles);
                hideLoader();
            }}
        />
    </LayoutFlexColumn>
};

export default VehicleEditPage;