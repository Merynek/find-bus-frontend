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
import {Color, FontSize} from "@/src/components/components/texts/textStyles";
import {Text} from "@/src/components/components/texts/text";
import {GENERAL_GA_EVENTS} from "@/src/enums/ga.enums";
import {useGtm} from "@/src/hooks/gtmHook";
import {useLoggedUser} from "@/src/hooks/authenticationHook";

export interface ITripFilterProps {
    params: ITripFilterParams;
}

export const TripFilter = (props: ITripFilterProps) => {
    const {params} = props;
    const router = useRouter();
    const {user} = useLoggedUser();
    const {sendEvent} = useGtm();
    const searchParams = useSearchParams();
    const [page, setPage] = useState<number|undefined>(params.page);
    const [dietForTransporter, setDietForTransporter] = useState<boolean|undefined>(params.dietForTransporter);
    const [maxNumberOfPersons, setMaxNumberOfPersons] = useState<number|undefined>(params.maxNumberOfPersons);
    const [onlyMine, setOnlyMine] = useState<boolean|undefined>(params.onlyMine);
    const [meOffered, setMeOffered] = useState<boolean|undefined>(params.meOffered);
    const [distanceFromInKm, setDistanceFromInKm] = useState<number|undefined>(params.distanceFromInKm);
    const [distanceToInKm, setDistanceToInKm] = useState<number|undefined>(params.distanceToInKm);
    const [maxDistanceInMeters, setMaxDistanceInMeters] = useState<number|undefined>(params.maxDistanceInMeters);

    const submit = (_page: number|undefined) => {
        const currentParams = new URLSearchParams(searchParams.toString());

        if (_page !== undefined) {
            currentParams.set(SEARCH_PARAMS.PAGE, _page.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.PAGE);
        }
        if (maxNumberOfPersons !== undefined && maxNumberOfPersons >= 0) {
            currentParams.set(SEARCH_PARAMS.NUMBER_OF_PERSONS, maxNumberOfPersons.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.NUMBER_OF_PERSONS);
        }
        if (distanceFromInKm !== undefined && distanceFromInKm >= 0) {
            currentParams.set(SEARCH_PARAMS.DISTANCE_FROM, distanceFromInKm.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.DISTANCE_FROM);
        }
        if (distanceToInKm !== undefined && distanceToInKm >= 0) {
            currentParams.set(SEARCH_PARAMS.DISTANCE_TO, distanceToInKm.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.DISTANCE_TO);
        }
        if (maxDistanceInMeters !== undefined && maxDistanceInMeters >= 0) {
            currentParams.set(SEARCH_PARAMS.MAX_DISTANCE_IN_METERS, maxDistanceInMeters.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.MAX_DISTANCE_IN_METERS);
        }
        // booleans
        if (dietForTransporter) {
            currentParams.set(SEARCH_PARAMS.DIET_FOR_TRANSPORTER, dietForTransporter.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.DIET_FOR_TRANSPORTER);
        }
        if (onlyMine) {
            currentParams.set(SEARCH_PARAMS.ONLY_MINE, onlyMine.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.ONLY_MINE);
        }
        if (meOffered) {
            currentParams.set(SEARCH_PARAMS.ME_OFFERED, meOffered.toString());
        } else {
            currentParams.delete(SEARCH_PARAMS.ME_OFFERED);
        }

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
                isDisabled={page ? page <= 1 : false}
                onClick={() => {
                    if (page && page > 1) {
                        const newPage = page - 1;
                        setPage(newPage);
                        submit(newPage);
                    }
                }}
                type={ButtonType.BLACK}
            />
            {<Text text={`Page: ${page}`} fontSize={FontSize.BASE_14} color={Color.BLACK} />}
            <ButtonClick
                controlled={true}
                size={ButtonSize.BY_CONTENT}
                label={"Next"}
                onClick={() => {
                    const newPage = page ? page + 1 : 2;
                    setPage(newPage);
                    submit(newPage);
                }}
                type={ButtonType.BLACK}
            />
        </LayoutFlexRow>
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            {user && <CheckBox
                controlled={true}
                checked={onlyMine || false}
                onChange={(val) => {
                    setOnlyMine(val);
                }}
                label={"Only Mine"}
            />}
            {user && <CheckBox
                controlled={true}
                checked={meOffered || false}
                onChange={(val) => {
                    setMeOffered(val);
                }}
                label={"Me Offered"}
            />}
            <CheckBox
                controlled={true}
                checked={dietForTransporter || false}
                onChange={(val) => {
                    setDietForTransporter(val);
                }}
                label={"Diet For Transporter"}
            />
            <NumberBox
                controlled={true}
                value={maxNumberOfPersons}
                onChange={(val) => {
                    setMaxNumberOfPersons(val);
                }}
                placeholder={"Max number Of persons"}
            />
            <NumberBox
                controlled={true}
                value={distanceFromInKm}
                onChange={(val) => {
                    setDistanceFromInKm(val);
                }}
                placeholder={"Distance From"}
            />
            <NumberBox
                controlled={true}
                value={distanceToInKm}
                onChange={(val) => {
                    setDistanceToInKm(val);
                }}
                placeholder={"Distance To"}
            />
            {user && <NumberBox
                controlled={true}
                value={maxDistanceInMeters}
                onChange={(val) => {
                    setMaxDistanceInMeters(val);
                    sendEvent(GENERAL_GA_EVENTS.SYSEL_TEST, {value: val});
                }}
                placeholder={"Distance from start point in meters"}
            />}
        </LayoutFlexRow>
        <ButtonClick
            controlled={true}
            onClick={() => {
                submit(page);
            }}
            label={"Submit"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </LayoutFlexColumn>
};