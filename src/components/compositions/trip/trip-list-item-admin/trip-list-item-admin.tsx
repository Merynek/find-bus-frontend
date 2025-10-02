import React from "react";
import styles from "./trip-list-item-admin.module.scss";
import {TripItem} from "@/src/data/tripItem";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Text} from "@/src/components/components/texts/text";
import {FlexGap} from "@/src/enums/layout.enum";
import {DateTimeManager} from "@/src/singletons/DateTimeManager";
import {DateTimeFormat} from "@/src/enums/date-time-format.enum";
import {ButtonLink, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";

export interface ITripListItemAdminProps {
    tripItem: TripItem;
}

export const TripListItemAdmin = (props: ITripListItemAdminProps) => {
    const {tripItem} = props;

    return <div className={styles.item}>
        <LayoutFlexRow gap={FlexGap.TINY_8} justifyContent={"space-between"} alignItems={"center"}>
            <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                <Text text={"ID: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                <Text text={tripItem.id.toString()} fontSize={FontSize.BASE_14} />
            </LayoutFlexRow>
            <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                <Text text={"Created: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                <Text text={DateTimeManager.dateTimeFormat(DateTimeFormat.FORMAT_DATE_TIME, tripItem.created)} fontSize={FontSize.BASE_14} />
            </LayoutFlexRow>
            <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                <Text text={"End offer: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                <Text text={DateTimeManager.dateTimeFormat(DateTimeFormat.FORMAT_DMY, tripItem.endOffer)} fontSize={FontSize.BASE_14} />
            </LayoutFlexRow>
            <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
                <Text text={"State: "} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
                <Text text={tripItem.offerState} fontSize={FontSize.BASE_14} />
            </LayoutFlexRow>
            <div style={{maxWidth: "250px"}}>
                <ButtonLink
                    route={{
                        route: ROUTES.ADMIN_TRIP_DETAIL,
                        params: { [URL_PARAMS.TRIP_ID]: tripItem.id.toString() }
                    }}
                    label={"Detail"}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </div>
        </LayoutFlexRow>
    </div>
};
