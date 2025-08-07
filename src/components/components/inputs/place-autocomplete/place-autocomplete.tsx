import React, {useCallback} from "react";
import {AutoComplete, IAutoCompleteItem} from "../autocomplete/auto-complete";
import {Place} from "@/src/data/place";
import {LocationService} from "@/src/singletons/location-service";

export interface IPlaceAutocompleteProps {
   place?: Place;
   placeHolder?: string;
   disabled?: boolean;
   onChange: (place: Place) => void;
}

export const PlaceAutocomplete = (props: IPlaceAutocompleteProps) => {
   const {onChange, place, placeHolder, disabled} = props;

   const getFilteredItems = useCallback(async (filter: string): Promise<IAutoCompleteItem<Place>[]> => {
      if (filter.length < 3) {
         return [];
      }
      const places = await LocationService.instance.searchPlace(filter);

      return places.map((place) => {
         return getValue(place);
      })
   }, [])

   const getValue = (p: Place): IAutoCompleteItem<Place> => {
      return {
         value: p,
         label: (p.name ? (p.name + ", ") : "") + (p.placeFormatted || "")
      }
   }

   return <AutoComplete
       getFilteredItems={getFilteredItems}
       placeholder={placeHolder}
       isDisabled={disabled}
       value={place ? getValue(place) : undefined}
       onChange={(value) => {
          onChange(value.value);
       }}
   />
}