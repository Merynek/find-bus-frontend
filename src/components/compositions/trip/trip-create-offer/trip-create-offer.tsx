import {Trip} from "@/src/data/trip/trip";
import React, {useRef, useState} from "react";
import styles from "./trip-create-offer.module.scss";
import {observer} from "mobx-react";
import {ComboBox} from "../../../components/inputs/combo-box/combo-box";
import {InputSize} from "../../../components/inputs/inputEnum";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {CurrentUser} from "@/src/singletons/current-user";
import {DatePicker} from "../../../components/inputs/date-picker/date-picker";
import {Price} from "@/src/data/price";
import {NumberBox} from "../../../components/inputs/number-box/number-box";
import {UserSettings} from "@/src/data/users/userSettings";
import {UsersApi} from "@/src/api/usersApi";
import {UserRole} from "@/src/api/openapi";
import {VehicleApi} from "@/src/api/vehicleApi";
import {useBean} from "ironbean-react";
import {useMount} from "@/src/hooks/lifecycleHooks";
import {AppManager} from "@/src/singletons/app-manager";
import {Offer} from "@/src/data/offer";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripOfferService} from "@/src/services/TripOfferService";

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
    const _currentUser = useBean(CurrentUser);
    const _usersApi = useBean(UsersApi);
    const _vehicleApi = useBean(VehicleApi);
    const _appManager = useBean(AppManager);

    const alreadyOffered = () => {
        return Boolean(offers.find(o => o.user.id === _currentUser.id));
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
        setUserSettings(await _usersApi.getSettings({}));
        if (_currentUser.role === UserRole.TRANSPORTER) {
            _currentUser.vehicles = await _vehicleApi.getVehicles({});
        }
    }

    const getBusItems = () => {
        return _currentUser.vehicles.map(vehicle => {
            return {
                value: vehicle.id.toString(),
                label: vehicle.name
            }
        });
    }

    const validate = () => {
        if (userSettings) {
            return userSettings.transferInfo.isValid;
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
            selected={selectedEndOfferDate}
            placeholderText={"Change Date"}
            minDate={minDate()}
            maxDate={maxDate()}
            showTimeSelect={true}
            onChange={(val) => {
                if (val) {
                    setSelectedEndOfferDate(val)
                }
            }}
        />
    }

    const _renderEdit = () => {
        return offers.length &&
            <LayoutFlexColumn>
                {_renderDateTimePicker()}
                <span>Kolik: {offers[0].price.amount} ,-</span>
                <ButtonClick
                    onClick={async () => {
                        const isValid = validate();
                        if (selectedEndOfferDate && isValid) {
                            _appManager.loading = true;
                            TripOfferService.updateOffer(offers[0].id, selectedEndOfferDate);
                            _appManager.loading = false;
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
                    onClick={async () => {
                        _appManager.loading = true;
                        await TripOfferService.deleteOffer(trip.id);
                        _appManager.loading = false;
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
        return <>
            <div className={styles.line}>
                <span>Kolik:</span>
                <NumberBox
                    value={priceAmount === undefined ? undefined : price.current.amount}
                    minValue={0}
                    onChange={(val) => {
                        if (val !== undefined) {
                            price.current.amount = val
                        } else {
                            price.current.amount = 0;
                        }
                        setPriceAmount(val)
                    }}
                    size={InputSize.MEDIUM}
                    hideSpinButtons
                />
            </div>
            <div className={styles.line}>
                <span>Bus:</span>
                <ComboBox
                    items={getBusItems()}
                    value={currentBus}
                    onChange={(val) => {
                        setCurrentBus(val);
                    }}
                />
            </div>
            <div className={styles.line}>
                <span>End Offer:</span>
                {_renderDateTimePicker()}
            </div>
            <ButtonClick
                type={ButtonType.BLACK}
                onClick={async () => {
                    const isValid = validate();
                    if (isValid && selectedEndOfferDate) {
                        _appManager.loading = true;
                        await TripOfferService.createOffer({
                            tripId: trip.id,
                            vehicleId: currentBus ? Number(currentBus.value) : 0,
                            price: price.current,
                            endOfferDate: selectedEndOfferDate
                        });
                        _appManager.loading = false;
                        onMakeOffer();
                    } else {
                        alert("User settings is not valid");
                    }
                }}
                label={"Nabídnout"}
                size={ButtonSize.BY_CONTENT}
            />
        </>
    }

    return <div className={styles.layout}>
        {alreadyOffered() ? _renderEdit() : _renderNewOffer()}
    </div>
});