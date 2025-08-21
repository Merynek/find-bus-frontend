import {TripOfferState} from "@/src/api/openapi";
import React from "react";
import styles from "./trip-state.module.scss";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {cn} from "@/src/utils/common";
import {FlexGap} from "@/src/enums/layout.enum";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight, TextAlign} from "@/src/components/components/texts/textStyles";

interface ITripStateProps {
    state: TripOfferState;
    isActive: boolean;
    isCompleted: boolean;
}

export const TripState = (props: ITripStateProps) => {
    const {state, isActive, isCompleted} = props;

    return <LayoutFlexColumn alignItems={"center"} gap={FlexGap.TINY_8}>
        <div className={cn(styles.circle, isActive && styles.active, isCompleted && styles.completed)} />
        <div className={styles.text}>
            <Text
                text={state}
                fontSize={FontSize.S_12}
                textAlign={TextAlign.CENTER}
                fontWeight={isActive ? FontWeight.SEMIBOLD : FontWeight.REGULAR}
            />
        </div>
    </LayoutFlexColumn>
};