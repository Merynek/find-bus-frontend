import React, {useState} from "react";
import {IPlaceAutocompleteProps, PlaceAutocomplete} from "./place-autocomplete";
import {Place} from "@/src/data/place";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: PlaceAutocomplete,
    args: {},
} as Meta<IPlaceAutocompleteProps>;

export const PlaceAutocompleteStory: StoryObj<IPlaceAutocompleteProps> = {
    render: () => {
        const [place, setPlace] = useState<Place|undefined>(undefined);
        return <PlaceAutocomplete
            onChange={(place) => {
                setPlace(place)
            }}
            place={place}
        />
    },
    args: {}
};