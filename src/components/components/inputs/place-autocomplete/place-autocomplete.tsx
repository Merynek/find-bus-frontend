import React, {useCallback} from "react";
import {AutoComplete, IAutoCompleteItem} from "../autocomplete/auto-complete";
import {Place} from "@/src/data/place";
import {LocationService} from "@/src/singletons/location-service";

export interface IPlaceAutocompleteProps {
   place?: Place;
   placeHolder?: string;
   emptyMessage?: string;
   loadingMessage?: string;
   disabled?: boolean;
   id?: string;
   name?: string;
   onChange: (place: Place) => void;
}

export const PlaceAutocomplete = (props: IPlaceAutocompleteProps) => {
   const {onChange, place, placeHolder, disabled, emptyMessage, loadingMessage, id, name} = props;

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
       id={id}
       name={name}
       getFilteredItems={getFilteredItems}
       placeholder={placeHolder}
       loadingMessage={loadingMessage}
       emptyMessage={emptyMessage}
       isDisabled={disabled}
       value={place ? getValue(place) : undefined}
       onChange={(value) => {
          onChange(value.value);
       }}
   />
}