import {Trip} from "@/src/data/trip/trip";
import React, {useRef, useState} from "react";
import styles from "./trip-create-offer.module.scss";
import {observer} from "mobx-react";
import {ComboBox} from "../../../components/inputs/combo-box/combo-box";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {DatePicker} from "../../../components/inputs/date-picker/date-picker";
import {Price} from "@/src/data/price";
import {NumberBox} from "../../../components/inputs/number-box/number-box";
import {UserSettings} from "@/src/data/users/userSettings";
import {UserRole} from "@/src/api/openapi";
import {useMount} from "@/src/hooks/lifecycleHooks";
import {Offer} from "@/src/data/offer";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripOfferService} from "@/src/services/TripOfferService";
import {UsersService} from "@/src/services/UsersService";
import {VehicleService} from "@/src/services/VehicleService";
import {useApp} from "@/src/context/AppContext";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {PriceConverter} from "@/src/converters/price-converter";
import {FlexGap} from "@/src/enums/layout.enum";
import {Vehicle} from "@/src/data/vehicle/vehicle";

export interface ITripCreateOfferProps {
    trip: Trip;
    offers: Offer[];
    onMakeOffer: () => void;
}

interface IBusComboItem {
    value: string;
    label: string;
}

export const TripCreateOffer = observer((props: ITripCreateOfferProps) => {
    const {trip, onMakeOffer, offers} = props;
    const {showLoader, hideLoader} = useApp();
    const {user} = useLoggedUser();
    const locale = useCurrentLocale();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const alreadyOffered = () => {
        return Boolean(offers.find(o => o.user.id === user?.id));
    }

    const price = useRef(Price.create());
    const [selectedEndOfferDate, setSelectedEndOfferDate] = useState<Date|null>(alreadyOffered() ? offers[0].endOfferDate : props.trip.endOrder);
    const [currentBus, setCurrentBus] = useState<IBusComboItem|undefined>(undefined);
    const [priceAmount, setPriceAmount] = useState<number|undefined>(undefined);
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

    const getBusItems = (): IBusComboItem[] => {
        return vehicles.map(vehicle => {
            return {
                value: vehicle.id?.toString() || "",
                label: vehicle.name
            }
        });
    }

    const validate = () => {
        if (userSettings) {
            return true; // todo userSettings.transferInfo.isValid;
        }
        return false;
    }

    const minDate = (): Date => {
        if (alreadyOffered()) {
            return offers[0].endOfferDate;
        }
        return new Date();
    }

    const maxDate = (): Date => {
        return trip.endOrder;
    }

    const _renderDateTimePicker = () => {
        return <DatePicker
            controlled={true}
            value={selectedEndOfferDate}
            placeholderText={"Change Date"}
            minDate={minDate()}
            maxDate={maxDate()}
            showTimeSelect={true}
            onChange={(val) => {
                if (val) {
                    setSelectedEndOfferDate(val)
                }
            }}
            locale={locale}
        />
    }

    const _renderEdit = () => {
        return offers.length &&
            <LayoutFlexColumn gap={FlexGap.TINY_8}>
                {_renderDateTimePicker()}
                <span>Kolik: {offers[0].price.amount} ,-</span>
                <ButtonClick
                    controlled={true}
                    onClick={async () => {
                        const isValid = validate();
                        if (selectedEndOfferDate && isValid) {
                            showLoader();
                            await TripOfferService.updateOffer(offers[0].id, selectedEndOfferDate);
                            hideLoader();
                            onMakeOffer();
                        } else {
                            alert("User settings is not valid");
                        }
                    }}
                    isDisabled={selectedEndOfferDate === null}
                    label={"Prodloužit nabídku"}
                    type={ButtonType.YELLOW}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
                <ButtonClick
                    controlled={true}
                    onClick={async () => {
                        showLoader();
                        await TripOfferService.deleteOffer(trip.id);
                        hideLoader();
                        onMakeOffer();
                    }}
                    isDisabled={selectedEndOfferDate === null}
                    label={"Smazat nabídku"}
                    type={ButtonType.YELLOW}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </LayoutFlexColumn>
    }

    const _renderNewOffer = () => {
        return <LayoutFlexColumn gap={FlexGap.LARGE_32}>
            <NumberBox
                placeholder={"Kolik"}
                controlled={true}
                value={priceAmount === undefined ? undefined : price.current.amount}
                minValue={1}
                onChange={(val) => {
                    if (val !== undefined) {
                        price.current.amount = val
                    } else {
                        price.current.amount = 0;
                    }
                    setPriceAmount(val)
                }}
            />
            <ComboBox
                placeHolder={"Vozidlo"}
                instanceId={"bus"}
                controlled={true}
                items={getBusItems()}
                value={currentBus}
                onChange={(val) => {
                    setCurrentBus(val);
                }}
            />
            {_renderDateTimePicker()}
            <ButtonClick
                controlled={true}
                type={ButtonType.BLACK}
                onClick={async () => {
                    const isValid = validate();
                    if (isValid && selectedEndOfferDate) {
                        showLoader();
                        await TripOfferService.createOffer({
                            tripId: trip.id,
                            vehicleId: currentBus ? Number(currentBus.value) : 0,
                            price: PriceConverter.toJson(price.current),
                            endOfferDate: selectedEndOfferDate
                        });
                        hideLoader();
                        onMakeOffer();
                    } else {
                        alert("User settings is not valid");
                    }
                }}
                label={"Nabídnout"}
                size={ButtonSize.BY_CONTENT}
            />
        </LayoutFlexColumn>

    }

    return <div className={styles.layout}>
        {alreadyOffered() ? _renderEdit() : _renderNewOffer()}
    </div>
});