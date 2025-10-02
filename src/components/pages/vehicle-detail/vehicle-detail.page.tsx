import React from "react";
import {Vehicle} from "@/src/data/users/vehicle";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehicleDetail} from "@/src/components/compositions/vehicle/detail-list/vehicle-detail-list";

interface IVehicleDetailPageProps {
    vehicle: Vehicle;
}

const VehicleDetailPage = (props: IVehicleDetailPageProps) => {
    const { vehicle } = props;

    return <LayoutFlexColumn>
        <VehicleDetail
            vehicle={vehicle}
        />
    </LayoutFlexColumn>
};

export default VehicleDetailPage;