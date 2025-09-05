import {Amenities} from "@/src/api/openapi";
import {CheckBox} from "@/src/components/components/inputs/check-box/check-box";
import {removeOnIndex} from "@/src/utils/common";
import React from "react";
import {Trip} from "@/src/data/trip/trip";
import {observer} from "mobx-react";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {useTranslate} from "@/src/hooks/translateHook";

interface ITripAmenitiesProps {
    trip: Trip;
}

export const TripAmenities = observer((props: ITripAmenitiesProps) => {
    const {trip} = props;
    const {t} = useTranslate("component.trip.amenities");

    return <LayoutFlexRow canWrap={true} gap={FlexGap.SMALL_16}>
        {Object.values(Amenities).map((amenity, index) => {
            return <CheckBox
                key={index}
                label={t(amenity)}
                value={trip.amenities.indexOf(amenity) > -1}
                onChange={(val) => {
                    if (val) {
                        trip.amenities.push(amenity);
                    } else {
                        const index = trip.amenities.indexOf(amenity);
                        removeOnIndex(trip.amenities, index);
                    }
                }}
            />
        })}
    </LayoutFlexRow>
});