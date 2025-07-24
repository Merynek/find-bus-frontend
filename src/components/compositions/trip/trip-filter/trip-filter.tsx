import React from "react";
import styles from "./trip-filter.module.scss";
import {observer} from "mobx-react";
import {CheckBox} from "../../../components/inputs/check-box/check-box";
import {TripFilterStore} from "./trip-filter.store";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {CheckBoxSize} from "@/src/enums/check-box.enum";
import { NumberBox } from "../../../components/inputs/number-box/number-box";

export interface ITripFilterProps {
    filter: TripFilterStore;
    onSubmit: () => void;
}

export const TripFilter = observer((props: ITripFilterProps) => {
    const {filter, onSubmit} = props;

    return <div className={styles.layout}>
        <div className={styles.item}>
            <span>Only Mine</span>
            <CheckBox value={filter.onlyMine} onChange={(val) => {
                filter.onlyMine = val;
            }} size={CheckBoxSize.SMALL} />
        </div>
        <div className={styles.item}>
            <span>Me Offered</span>
            <CheckBox value={filter.meOffered} onChange={(val) => {
                filter.meOffered = val;
            }} size={CheckBoxSize.SMALL} />
        </div>
        <div className={styles.item}>
            <span>Diet For Transporter</span>
            <CheckBox value={filter.dietForTransporter} onChange={(val) => {
                filter.dietForTransporter = val;
            }} size={CheckBoxSize.SMALL} />
        </div>
        <div className={styles.item}>
            <span>Max number Of persons</span>
            <NumberBox value={filter.maxNumberOfPersons || 0} onChange={(val) => {
                if (val) {
                    filter.maxNumberOfPersons = val;
                }
            }} />
        </div>
        <div className={styles.item}>
            <span>Distance From</span>
            <NumberBox value={filter.distanceFromInKm || 0} onChange={(val) => {
                if (val) {
                    if (val < 0) {
                        filter.distanceFromInKm = 0;
                    } else {
                        filter.distanceFromInKm = val;
                    }
                }
            }} />
        </div>
        <div className={styles.item}>
            <span>Distance To</span>
            <NumberBox value={filter.distanceToInKm || 0} onChange={(val) => {
                if (val) {
                    if (val < 0) {
                        filter.distanceToInKm = 0;
                    } else {
                        filter.distanceToInKm = val;
                    }
                }
            }} />
        </div>
        {/*{filter.departure && <div className={styles.item}>*/}
        {/*    <LayoutFlexColumn>*/}
        {/*        <span><b>Departure Distance</b></span>*/}
        {/*        <LayoutFlexColumn>*/}
        {/*            <span>Distance in KM</span>*/}
        {/*            <NumberBox*/}
        {/*                value={filter.departure.distanceFromDepartureInKm || 0}*/}
        {/*                onChange={(val) => {*/}
        {/*                    if (val && filter.departure) {*/}
        {/*                        if (val < 0) {*/}
        {/*                            filter.departure.distanceFromDepartureInKm = 0;*/}
        {/*                        } else {*/}
        {/*                            filter.departure.distanceFromDepartureInKm = val;*/}
        {/*                        }*/}
        {/*                    }*/}
        {/*                }}*/}
        {/*            />*/}
        {/*        </LayoutFlexColumn>*/}
        {/*        <LayoutFlexColumn>*/}
        {/*            <span>Place</span>*/}
        {/*            <PlaceAutocomplete*/}
        {/*                place={stop.place}*/}
        {/*                onChange={(place) => {*/}
        {/*                    runInAction(() => {*/}
        {/*                        if (place) {*/}
        {/*                            stop.place = _placeManager.add(place);*/}
        {/*                        }*/}
        {/*                    })*/}
        {/*                }}*/}
        {/*            />*/}
        {/*        </LayoutFlexColumn>*/}
        {/*    </LayoutFlexColumn>*/}
        {/*</div>}*/}
        <ButtonClick
            onClick={() => {
                onSubmit();
            }}
            label={"Submit"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </div>
});