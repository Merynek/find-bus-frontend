import React, {useCallback} from "react";
import {AutoComplete, IAutoCompleteItem} from "../autocomplete/auto-complete";
import {Place} from "@/src/data/place";
import {LocationService} from "@/src/singletons/LocationService";
import {MapPicker} from "@/src/components/compositions/map-picker/map-picker";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";

export interface IPlaceAutocompleteProps {
   place?: Place;
   placeHolder?: string;
   emptyMessage?: string;
   loadingMessage?: string;
   withMapPicker?: boolean;
   disabled?: boolean;
   id?: string;
   name?: string;
   onChange: (place: Place) => void;
   instanceId: string;
}

export const PlaceAutocomplete = (props: IPlaceAutocompleteProps) => {
   const {onChange, place, placeHolder, disabled, emptyMessage, loadingMessage, withMapPicker, id, name, instanceId} = props;

   const getValue = (p: Place): IAutoCompleteItem<Place> => {
      return {
         value: p,
         label: (p.name ? (p.name + ", ") : "") + (p.placeFormatted || "")
      }
   }

   const getFilteredItems = useCallback(async (filter: string): Promise<IAutoCompleteItem<Place>[]> => {
      if (filter.length < 3) {
         return [];
      }
      const places = await LocationService.instance.searchPlace(filter);

      return places.map((place) => {
         return getValue(place);
      })
   }, [])

    const renderMapPicker = () => {
        return <MapPicker
            id={instanceId}
            place={place}
            onChange={(place) => {
                onChange(place);
            }}
        />
    }

    return <LayoutFlexRow gap={FlexGap.TINY_8}>
        <AutoComplete
            id={id}
            name={name}
            instanceId={instanceId}
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
        {withMapPicker && renderMapPicker()}
    </LayoutFlexRow>
}