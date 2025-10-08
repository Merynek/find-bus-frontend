import React from "react";
import {ButtonLink, ButtonSize, ButtonType} from "../../components/button/button";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import AddVehicleButton from "@/src/components/pages/vehicles/add-vehicle-button";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";

export interface IVehiclesPageProps {
    vehicles: Vehicle[];
}

const VehiclesPage = (props: IVehiclesPageProps) => {
    const {vehicles} = props;

    const _renderList = () => {
        return <LayoutFlexColumn gap={FlexGap.LARGE_32}>
            {vehicles.map((vehicle => {
                return <LayoutFlexRow key={vehicle.id} gap={FlexGap.MEDIUM_24}>
                    <Text text={vehicle.id.toString()} fontSize={FontSize.M_24} fontWeight={FontWeight.SEMIBOLD} />
                    <Text text={vehicle.name} fontSize={FontSize.M_24} fontWeight={FontWeight.SEMIBOLD} />
                    <ButtonLink
                        route={{
                            route: ROUTES.VEHICLE_DETAIL,
                            params: { [URL_PARAMS.VEHICLE_ID]: vehicle.id.toString() }
                        }}
                        label={"Detail"}
                        type={ButtonType.BLACK}
                        size={ButtonSize.BUTTON_SIZE_M}
                    />
                    <ButtonLink
                        route={{
                            route: ROUTES.VEHICLE_EDIT,
                            params: { [URL_PARAMS.VEHICLE_ID]: vehicle.id.toString() }
                        }}
                        label={"EDIT"}
                        type={ButtonType.BLACK}
                        size={ButtonSize.BUTTON_SIZE_M}
                    />
                </LayoutFlexRow>
            }))}
        </LayoutFlexColumn>
    }

    return <LayoutFlexColumn>
        <AddVehicleButton />
        {_renderList()}
    </LayoutFlexColumn>
};

export default VehiclesPage;