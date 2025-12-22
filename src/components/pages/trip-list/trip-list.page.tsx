import React from "react";
import {TripListItem} from "../../compositions/trip/trip-list-item/trip-list-item";
import {TripFilter} from "../../compositions/trip/trip-filter/trip-filter";
import {TripItem} from "@/src/data/trip/tripItem";
import {ITripFilterParams} from "@/src/components/compositions/trip/trip-filter/trip-filter-types";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripItemConverter} from "@/src/converters/trip-item-converter";

interface ITripListPageProps {
    items: TripItem[];
    params: ITripFilterParams;
}

const TripListPage = (props: ITripListPageProps) => {
    const {items, params} = props;

    return <LayoutFlexColumn>
        <TripFilter
            params={params}
        />
        <LayoutFlexColumn>
            {items.map((tripItem) => {
                return <TripListItem tripItem={TripItemConverter.toJson(tripItem)} key={tripItem.id} />
            })}
        </LayoutFlexColumn>
    </LayoutFlexColumn>
};

export default TripListPage;