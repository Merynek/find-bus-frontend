"use client";

import React, {useState} from "react";
import {CheckBox} from "../../../components/inputs/check-box/check-box";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {NumberBox} from "../../../components/inputs/number-box/number-box";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ITripFilterParams} from "@/src/components/compositions/trip/trip-filter/trip-filter-types";
import {ROUTES, SEARCH_PARAMS} from "@/src/enums/router.enum";
import {useRouter} from "@/src/i18n/navigation";
import {useSearchParams} from "next/navigation";

export interface ITripFilterProps {
    params: ITripFilterParams;
}

export const TripFilter = (props: ITripFilterProps) => {
    const {params} = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(params.page || 0);
    const [dietForTransporter, setDietForTransporter] = useState<boolean>(params.dietForTransporter || false);
    const [maxNumberOfPersons, setMaxNumberOfPersons] = useState<number>(params.maxNumberOfPersons || 0);
    const [onlyMine, setOnlyMine] = useState<boolean>(params.onlyMine || false);
    const [meOffered, setMeOffered] = useState<boolean>(params.meOffered || false);
    const [distanceFromInKm, setDistanceFromInKm] = useState<number>(params.distanceFromInKm || 0);
    const [distanceToInKm, setDistanceToInKm] = useState<number>(params.distanceToInKm || 0);

    const submit = () => {
        const currentParams = new URLSearchParams(searchParams.toString());

        currentParams.set(SEARCH_PARAMS.PAGE, page.toString());
        currentParams.set(SEARCH_PARAMS.NUMBER_OF_PERSONS, maxNumberOfPersons.toString());
        currentParams.set(SEARCH_PARAMS.DIET_FOR_TRANSPORTER, dietForTransporter.toString());
        currentParams.set(SEARCH_PARAMS.ONLY_MINE, onlyMine.toString());
        currentParams.set(SEARCH_PARAMS.ME_OFFERED, meOffered.toString());
        currentParams.set(SEARCH_PARAMS.DISTANCE_FROM, distanceToInKm.toString());
        currentParams.set(SEARCH_PARAMS.DISTANCE_TO, distanceToInKm.toString());
        const newQuery = Object.fromEntries(currentParams.entries());

        router.push({
            pathname: ROUTES.TRIP_LIST,
            query: newQuery
        });
    }

    return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
        <LayoutFlexRow gap={FlexGap.MEDIUM_24}>
            <ButtonClick
                controlled={true}
                size={ButtonSize.BY_CONTENT}
                label={"Back"}
                isDisabled={page <= 1}
                onClick={() => {
                    if (page > 1) {
                        setPage(page - 1);
                    }
                }}
                type={ButtonType.BLACK}
            />
            <ButtonClick
                controlled={true}
                size={ButtonSize.BY_CONTENT}
                label={"Next"}
                onClick={() => {
                    setPage(page + 1);
                }}
                type={ButtonType.BLACK}
            />
        </LayoutFlexRow>
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            <CheckBox
                controlled={true}
                checked={onlyMine}
                onChange={(val) => {
                    setOnlyMine(val);
                }}
                label={"Only Mine"}
            />
            <CheckBox
                controlled={true}
                checked={meOffered}
                onChange={(val) => {
                    setMeOffered(val);
                }}
                label={"Me Offered"}
            />
            <CheckBox
                controlled={true}
                checked={dietForTransporter}
                onChange={(val) => {
                    setDietForTransporter(val);
                }}
                label={"Diet For Transporter"}
            />
            <NumberBox
                controlled={true}
                value={maxNumberOfPersons}
                onChange={(val) => {
                    if (val) {
                        setMaxNumberOfPersons(val);
                    }
                }}
                placeholder={"Max number Of persons"}
            />
            <NumberBox
                controlled={true}
                value={distanceFromInKm}
                onChange={(val) => {
                    if (val) {
                        if (val < 0) {
                            setDistanceFromInKm(0);
                        } else {
                            setDistanceFromInKm(val);
                        }
                    }
                }}
                placeholder={"Distance From"}
            />
            <NumberBox
                controlled={true}
                value={distanceToInKm}
                onChange={(val) => {
                    if (val) {
                        if (val < 0) {
                            setDistanceToInKm(0);
                        } else {
                            setDistanceToInKm(val);
                        }
                    }
                }}
            />
        </LayoutFlexRow>
        <ButtonClick
            controlled={true}
            onClick={submit}
            label={"Submit"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </LayoutFlexColumn>
};