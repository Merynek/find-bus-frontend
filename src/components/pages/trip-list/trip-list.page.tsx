import React, {useEffect, useRef} from "react";
import {TripListPageStore} from "./trip-list.page.store";
import styles from "./trip-list.page.module.scss";
import {observer} from "mobx-react";
import {TripListItem} from "../../compositions/trip/trip-list-item/trip-list-item";
import {TripFilter} from "../../compositions/trip/trip-filter/trip-filter";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {useSearchParams} from "react-router-dom";
import {SEARCH_PARAMS} from "@/src/enums/router.enum";

export interface ITripListPageProps {
}

const TripListPage = observer((props: ITripListPageProps) => {
    const _storeRef = useRef<TripListPageStore>(new TripListPageStore());
    const _locKey = "page.tripList."
    const filter = _storeRef.current.filter;
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const page = searchParams.get(SEARCH_PARAMS.PAGE);
        const persons = searchParams.get(SEARCH_PARAMS.NUMBER_OF_PERSONS);
        const dietForTransporter = searchParams.get(SEARCH_PARAMS.DIET_FOR_TRANSPORTER);
        const onlyMine = searchParams.get(SEARCH_PARAMS.ONLY_MINE);
        const meOffered = searchParams.get(SEARCH_PARAMS.ME_OFFERED);
        const distanceFrom = searchParams.get(SEARCH_PARAMS.DISTANCE_FROM);
        const distanceTo = searchParams.get(SEARCH_PARAMS.DISTANCE_TO);

        _storeRef.current.loadDataFromUrl({
            page: page ? Number(page) : undefined,
            numberOfPersons: persons ? Number(persons) : undefined,
            dietForTransporter: dietForTransporter === "true",
            onlyMine: onlyMine === "true",
            meOffered: meOffered === "true",
            distanceFrom: distanceFrom ? Number(distanceFrom) : undefined,
            distanceTo: distanceTo ? Number(distanceTo) : undefined
        })
    }, [searchParams]);

    const setUrl = () => {
        setSearchParams(params => {
            params.set(SEARCH_PARAMS.PAGE, filter.page.toString());
            params.set(SEARCH_PARAMS.NUMBER_OF_PERSONS, filter.maxNumberOfPersons.toString());
            params.set(SEARCH_PARAMS.DIET_FOR_TRANSPORTER, filter.dietForTransporter.toString());
            params.set(SEARCH_PARAMS.ONLY_MINE, filter.onlyMine.toString());
            params.set(SEARCH_PARAMS.ME_OFFERED, filter.meOffered.toString());
            params.set(SEARCH_PARAMS.DISTANCE_FROM, filter.distanceToInKm.toString());
            params.set(SEARCH_PARAMS.DISTANCE_TO, filter.distanceToInKm.toString());
            return params;
        })
    }

    const _renderFilter = () => {
        return <div className={styles.filter}>
            <TripFilter
                filter={_storeRef.current.filter}
                onSubmit={() => {
                    setUrl();
                }}
            />
        </div>
    }

    return <div className={styles.layout}>
        {_renderFilter()}
        <div className={styles.list}>
            {_storeRef.current.tripItems.map((tripItem) => {
                return <TripListItem tripItem={tripItem} key={tripItem.id}/>
            })}
        </div>
        <div>
            <ButtonClick size={ButtonSize.BY_CONTENT} label={"Back"} onClick={async () => {
                await _storeRef.current.setPage(false);
                setUrl();
            }} type={ButtonType.BLACK} />
            <ButtonClick size={ButtonSize.BY_CONTENT} label={"Next"} onClick={async () => {
                await _storeRef.current.setPage(true);
                setUrl();
            }} type={ButtonType.BLACK} />
        </div>
    </div>
});

export default TripListPage;