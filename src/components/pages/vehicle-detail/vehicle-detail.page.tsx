import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehicleDetail} from "@/src/components/compositions/vehicle/detail-list/vehicle-detail-list";
import {Vehicle} from "@/src/data/vehicle/vehicle";

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