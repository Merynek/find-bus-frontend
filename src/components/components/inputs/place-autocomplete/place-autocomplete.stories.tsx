import React, {useState} from "react";
import {PlaceAutocomplete} from "./place-autocomplete";
import {Place} from "@/src/data/place";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof PlaceAutocomplete> = {
    component: PlaceAutocomplete,
    args: {
        disabled: false,
        emptyMessage: "Empty message",
        loadingMessage: "Loading Message",
        placeHolder: "PlaceHolder"
    },
    argTypes: {
    },
};

export default meta;

export const Default: StoryObj<typeof PlaceAutocomplete> = {
    render: (args) => {
        const [place, setPlace] = useState<Place|undefined>(undefined);
        return <PlaceAutocomplete
            {...args}
            onChange={(place) => {
                setPlace(place)
            }}
            place={place}
        />
    },
    args: {}
};