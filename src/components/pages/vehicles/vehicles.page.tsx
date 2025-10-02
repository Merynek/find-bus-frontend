import React from "react";
import {VehicleDetail} from "../../compositions/vehicle/detail-list/vehicle-detail-list";
import {ButtonLink, ButtonSize, ButtonType} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import AddVehicleButton from "@/src/components/pages/vehicles/add-vehicle-button";
import {Vehicle} from "@/src/data/users/vehicle";

export interface IVehiclesPageProps {
    vehicles: Vehicle[];
}

const VehiclesPage = (props: IVehiclesPageProps) => {
    const {vehicles} = props;

    const _renderList = () => {
        return <div>
            <AddVehicleButton />
            {vehicles.map((vehicle => {
                return <div key={vehicle.id}>
                    <VehicleDetail
                        vehicle={vehicle}
                    />
                    <ButtonLink
                        route={{
                            route: ROUTES.VEHICLE_EDIT,
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

    return <LayoutFlexColumn>
        {_renderList()}
    </LayoutFlexColumn>
};

export default VehiclesPage;