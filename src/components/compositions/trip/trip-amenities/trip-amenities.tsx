import {Amenities} from "@/src/api/openapi";
import React from "react";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {useTranslate} from "@/src/hooks/translateHook";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";

interface ITripAmenitiesProps {
    amenities: Amenities[];
}

export const TripAmenities = (props: ITripAmenitiesProps) => {
    const {amenities} = props;
    const {t} = useTranslate("component.trip.amenities");

    return <LayoutFlexRow canWrap={true} gap={FlexGap.SMALL_16}>
        {amenities.map((amenity, index) => {
            return <Text
                key={index}
                text={t(amenity)}
                fontSize={FontSize.BASE_14}
            />
        })}
    </LayoutFlexRow>
};