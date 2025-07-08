import React, {useRef} from "react";
import styles from "./trip-detail.page.module.scss";
import {TripDetailPageStore} from "./trip-detail.page.store";
import {observer} from "mobx-react";
import {TripDetail} from "../../compositions/trip/trip-detail/trip-detail";
import {useParams} from 'next/navigation';
import {TripOfferSection} from "../../compositions/trip/trip-offer-section/trip-offer-section";


const TripDetailPage = observer(() => {
    const { id } = useParams();
    const _storeRef = useRef<TripDetailPageStore>(new TripDetailPageStore(Number(id)));

    return <div className={styles.layout}>
        {_storeRef.current.trip && <>
            <TripDetail trip={_storeRef.current.trip} />
            <TripOfferSection trip={_storeRef.current.trip} />
        </>}
    </div>
});

export default TripDetailPage;