import React from "react";
import {ModalDialog} from "../../../components/modal-dialog/modal-dialog";
import {VehicleDetail} from "../detail-list/vehicle-detail-list";
import {Vehicle} from "@/src/data/vehicle/vehicle";

export interface IModalVehicleDetailProps {
    vehicle: Vehicle;
    onClose: () => void;
    open: boolean;
}

export const VehicleDetailModal = (props: IModalVehicleDetailProps) => {
    const {open, onClose, vehicle} = props;
    return (
        <ModalDialog
            open={open}
            headerText={vehicle.name}
            onClose={onClose}
        >
            <VehicleDetail
                vehicle={vehicle}
            />
        </ModalDialog>
    )
};