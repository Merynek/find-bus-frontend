import React from "react";
import {TripListItem} from "../../compositions/trip/trip-list-item/trip-list-item";
import {TripItem} from "@/src/data/trip/tripItem";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripItemConverter} from "@/src/converters/trip-item-converter";

interface ITripListPageProps {
    items: TripItem[];
}

const TripDraftListPage = (props: ITripListPageProps) => {
    const {items} = props;

    return <LayoutFlexColumn>
        <LayoutFlexColumn>
            {items.map((tripItem) => {
                return <TripListItem tripItem={TripItemConverter.toJson(tripItem)} key={tripItem.id} />
            })}
        </LayoutFlexColumn>
    </LayoutFlexColumn>
};

export default TripDraftListPage;