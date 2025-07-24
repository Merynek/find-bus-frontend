import {observer} from "mobx-react";
import React from "react";
import {ModalDialog} from "../../../components/modal-dialog/modal-dialog";
import {Vehicle} from "@/src/data/users/vehicle";
import {VehicleDetail} from "../detail-list/vehicle-detail-list";

export interface IModalVehicleDetailProps {
    vehicle: Vehicle;
    onClose: () => void;
    open: boolean;
}

export const VehicleDetailModal = observer((props: IModalVehicleDetailProps) => {
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
});