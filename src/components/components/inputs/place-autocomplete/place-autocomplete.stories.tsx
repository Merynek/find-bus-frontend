import React, {useState} from "react";
import {IPlaceAutocompleteProps, PlaceAutocomplete} from "./place-autocomplete";
import {Place} from "@/src/data/place";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: PlaceAutocomplete,
    args: {},
} as Meta<IPlaceAutocompleteProps>;

export const PlaceAutocompleteStory: StoryObj<IPlaceAutocompleteProps> = {
    render: (args) => {
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