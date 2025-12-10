import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";

interface IGroupProps {
    title: string;
    children: React.ReactNode;
}

export const Group = (props: IGroupProps) => {
    const {title, children} = props;
    return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
        <Text text={title} fontSize={FontSize.M_22} fontWeight={FontWeight.SEMIBOLD} />
        {children}
    </LayoutFlexColumn>
}