import {Trip} from "@/src/data/trip/trip";
import React, {useState} from "react";
import styles from "./trip-create-offer.module.scss";
import {observer} from "mobx-react";
import {UserSettings} from "@/src/data/users/userSettings";
import {useMount} from "@/src/hooks/lifecycleHooks";
import {Offer} from "@/src/data/offer";
import {UsersService} from "@/src/services/UsersService";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {TripChangeOffer} from "@/src/components/compositions/trip/trip-create-offer/trip-change-offer";
import {TripNewOffer} from "@/src/components/compositions/trip/trip-create-offer/trip-new-offer";

export interface ITripCreateOfferProps {
    trip: Trip;
    offers: Offer[];
    onMakeOffer: () => void;
}

export const TripCreateOffer = observer((props: ITripCreateOfferProps) => {
    const {trip, onMakeOffer, offers} = props;
    const {user} = useLoggedUser();

    const alreadyOffered = () => {
        return Boolean(offers.find(o => o.user.id === user?.id));
    }

    const [userSettings, setUserSettings] = useState<UserSettings|null>(null);

    useMount(() => {
        _init();
    })

    const _init = async () => {
        setUserSettings(await UsersService.getSettings());
    }

    return <div className={styles.layout}>
        {userSettings && <>
            {alreadyOffered() ? <TripChangeOffer
                trip={trip}
                offer={offers[0]}
                userSettings={userSettings}
                onChangeOffer={onMakeOffer}
            /> : <TripNewOffer
                trip={trip}
                userSettings={userSettings}
                onNewOffer={onMakeOffer}
            />}
        </>}
    </div>
});