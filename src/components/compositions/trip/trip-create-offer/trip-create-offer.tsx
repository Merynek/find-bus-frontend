import {Trip} from "@/src/data/trip/trip";
import React, {useState} from "react";
import {observer} from "mobx-react";
import {UserSettings} from "@/src/data/users/userSettings";
import {useMount} from "@/src/hooks/lifecycleHooks";
import {Offer} from "@/src/data/offer";
import {UsersService} from "@/src/services/UsersService";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {TripChangeOffer} from "@/src/components/compositions/trip/trip-create-offer/trip-change-offer";
import {TripNewOffer} from "@/src/components/compositions/trip/trip-create-offer/trip-new-offer";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {UserRole} from "@/src/api/openapi";
import {VehicleService} from "@/src/services/VehicleService";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";

export interface ITripCreateOfferProps {
    trip: Trip;
    offers: Offer[];
    onMakeOffer: () => void;
}

export const TripCreateOffer = observer((props: ITripCreateOfferProps) => {
    const {trip, onMakeOffer, offers} = props;
    const {user} = useLoggedUser();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const myOffers = offers.filter(o => o.user.id === user?.id);

    const [userSettings, setUserSettings] = useState<UserSettings|null>(null);

    useMount(() => {
        _init();
    })

    const _init = async () => {
        setUserSettings(await UsersService.getSettings());
        if (user?.role === UserRole.TRANSPORTER) {
            setVehicles(await VehicleService.getVehicles({verified: true}));
        }
    }

    const getAvailableVehicles = (): Vehicle[] => {
        const usedVehicleIds = offers.map(offer => offer.vehicle.id);
        return vehicles.filter(vehicle => !usedVehicleIds.includes(vehicle.id));
    }

    const availableVehicles = getAvailableVehicles();

    const _renderMyOffers = () => {
        return userSettings ? <LayoutFlexColumn gap={FlexGap.TINY_8} style={{border: "2px solid green"}}>
            <Heading text={"Moje nabídky"} headingLevel={2} />
            {myOffers.map(o => {
                const vehiclesForOffer = [...availableVehicles];
                const currentVehicle = o.vehicle;
                if (!vehiclesForOffer.some(v => v.id === currentVehicle.id)) {
                    vehiclesForOffer.push(currentVehicle);
                }
                return <TripChangeOffer
                    key={o.id}
                    trip={trip}
                    offer={o}
                    userSettings={userSettings}
                    onChangeOffer={onMakeOffer}
                    availableVehicles={vehiclesForOffer}
                />
            }) }
        </LayoutFlexColumn> : <></>
    }

    return <LayoutFlexColumn gap={FlexGap.LARGE_32}>
        {_renderMyOffers()}
        {userSettings && availableVehicles.length > 0 && <TripNewOffer
            trip={trip}
            userSettings={userSettings}
            onNewOffer={onMakeOffer}
            availableVehicles={availableVehicles}
        />}
    </LayoutFlexColumn>
});