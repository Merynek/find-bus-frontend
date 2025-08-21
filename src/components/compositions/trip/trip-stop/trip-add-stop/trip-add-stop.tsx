import {Place} from "@/src/data/place";
import {GeoPoint} from "@/src/data/geoPoint";
import React from "react";
import {PlaceManager} from "@/src/singletons/place-manager";
import {cn} from "@/src/utils/common";
import styles from "./trip-add-stop.module.scss";
import {observer} from "mobx-react";
import {ButtonClick, ButtonSize, ButtonType} from "../../../../components/button/button";
import {Icon} from "../../../../components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";
import {PlaceAutocomplete} from "../../../../components/inputs/place-autocomplete/place-autocomplete";
import {useInit} from "@/src/hooks/lifecycleHooks";

export interface IStopAddPlaceProps {
    onAddTripPlace: (place: Place) => void;
    onHide?: () => void;
    placeholder?: string;
    allGeoPoints: GeoPoint[];
}

export const TripAddStop = observer((props: IStopAddPlaceProps) => {
    const { onHide, onAddTripPlace} = props;
    const _placeManager = useInit(() => PlaceManager.instance);

    const handleAddPlace = (place: Place|undefined) => {
        if (place) {
            const tripPlace = _placeManager.add(place);
            onAddTripPlace(tripPlace);
        }
    }

    return (
        <div className={styles.layout}>
            <div className={styles.contentWrap}>
                <Icon icon={IconType.LOCATION_ON} />
                <div className={cn(styles.middleSection)}>
                    <div className={styles.placeName}>
                        <PlaceAutocomplete
                            onChange={handleAddPlace}
                        />
                    </div>
                </div>
            </div>
            {onHide &&
                <div className={styles.options}>
                    <ButtonClick
                        controlled={true}
                        type={ButtonType.YELLOW}
                        size={ButtonSize.BY_CONTENT}
                        label={"REMOVE"}
                        // icon={<SvgIcon
                        //     icon={SvgIconType.GARBAGE}
                        //     size={SvgIconSize.SMALL}
                        //     color={SvgIconColor.DARK_GRAY}
                        //     tooltip={{
                        //         message: t(this._translationKey + "remove")
                        //     }}
                        // />}
                        onClick={() => {
                            onHide();
                        }}
                    />
                </div>}
        </div>
    )
});