"use client";

import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehicleResponseDto, VehicleStatus} from "@/src/api/openapi";
import {useTranslate} from "@/src/hooks/translateHook";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";
import {VehicleDetail} from "@/src/components/compositions/vehicle/detail-list/vehicle-detail-list";
import VehicleVerification from "@/src/components/pages/admin/vehicle-edit/vehicle-verification";
import VehicleVerificationPhotos from "@/src/components/pages/admin/vehicle-edit/vehicle-verification-photos";

interface IAdminVehicleEditPageProps {
    vehicle: VehicleResponseDto;
}

const AdminVehicleEditPage = (props: IAdminVehicleEditPageProps) => {
    const vehicle = VehicleConverter.toInstance(props.vehicle);
    const { t } = useTranslate("page.adminVehicle");
    const showVerification = vehicle.status === VehicleStatus.PENDING_VERIFICATION;

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("vehicleHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <VehicleDetail vehicle={vehicle} noPhotos={showVerification} />
        {showVerification && <>
            <VehicleVerificationPhotos vehicle={vehicle} />
            <VehicleVerification vehicle={vehicle} />
        </>}
    </LayoutFlexColumn>
};

export default AdminVehicleEditPage;
