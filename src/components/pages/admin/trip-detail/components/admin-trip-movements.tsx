import React from "react";
import {FlexGap} from "@/src/enums/layout.enum";
import {TripOfferMovement} from "@/src/data/tripOfferMovement";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {formatDateTime} from "@/src/utils/date-time.format";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {useCurrentLocale} from "@/src/hooks/translateHook";

interface IAdminTripMovementsProps {
    movements: TripOfferMovement[];
}

export const AdminTripMovements = (props: IAdminTripMovementsProps) => {
    const {movements} = props;
    const locale = useCurrentLocale();

    const _renderItem = (movement: TripOfferMovement) => {
        return <LayoutFlexRow gap={FlexGap.TINY_8}>
            <div><b> From:</b> {movement.from.toString()}</div>
            <div><b>To:</b> {movement.to.toString()}</div>
            {movement.reason && <div>Reason: <b>{movement.reason?.toString()}</b></div>}
            {movement.customReason && <div>Custom Reason: <b>{movement.customReason}</b></div>}
            <div>Date: {formatDateTime({
                locale: locale,
                date: movement.datetime
            })}</div>
        </LayoutFlexRow>
    }

    return <LayoutFlexColumn gap={FlexGap.TINY_8}>
        {movements.map((item) => {
            return <React.Fragment key={item.id}>
                {_renderItem(item)}
            </React.Fragment>
        })}
    </LayoutFlexColumn>
};
