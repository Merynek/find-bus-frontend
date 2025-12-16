import {Trip} from "@/src/data/trip/trip";
import React, {useRef, useState} from "react";
import styles from "./trip-create-offer.module.scss";
import {observer} from "mobx-react";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {DatePicker} from "../../../components/inputs/date-picker/date-picker";
import {Price} from "@/src/data/price";
import {NumberBox} from "../../../components/inputs/number-box/number-box";
import {UserSettings} from "@/src/data/users/userSettings";
import {Currency} from "@/src/api/openapi";
import {Offer} from "@/src/data/offer";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripOfferService} from "@/src/services/TripOfferService";
import {useApp} from "@/src/context/AppContext";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {FlexGap} from "@/src/enums/layout.enum";
import {getApiErrorMessage} from "@/src/utils/handleApiErrors";
import {VehicleDetailModal} from "@/src/components/compositions/vehicle/modal-vehicle-detail/vehicle-detail-modal";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {VehicleService} from "@/src/services/VehicleService";
import {Heading} from "@/src/components/components/texts/heading";
import {ComboBox} from "@/src/components/components/inputs/combo-box/combo-box";

interface ITripChangeOfferProps {
    trip: Trip;
    offer: Offer;
    onChangeOffer: () => void;
    userSettings: UserSettings;
    availableVehicles: Vehicle[];
}

interface IBusComboItem {
    value: string;
    label: string;
}

export const TripChangeOffer = observer((props: ITripChangeOfferProps) => {
    const {trip, onChangeOffer, offer, userSettings, availableVehicles} = props;
    const {showLoader, hideLoader} = useApp();
    const locale = useCurrentLocale();
    const price = useRef(Price.create());
    const [vehicleDetail, setVehicleDetail] = useState<Vehicle|null>(null);
    const [selectedEndOfferDate, setSelectedEndOfferDate] = useState<Date|null>(offer.endOfferDate);
    const [priceAmount, setPriceAmount] = useState<number|undefined>(offer.price.amount);

    const validate = () => {
        if (userSettings) {
            return true; // todo userSettings.transferInfo.isValid;
        }
        return false;
    }

    const minDate = (): Date => {
        return offer.endOfferDate
    }

    const maxDate = (): Date|null => {
        return trip.endOrder || null;
    }

    const getBusItems = (): IBusComboItem[] => {
        return availableVehicles.map(vehicle => {
            return {
                value: vehicle.id?.toString() || "",
                label: vehicle.name
            }
        });
    }
    const initBus = getBusItems().find(b => b.value === offer.vehicle.id.toString());
    const [currentBus, setCurrentBus] = useState<IBusComboItem|undefined>(initBus);

    const renderVehicleModal = () => {
        return vehicleDetail && <VehicleDetailModal
            open={Boolean(vehicleDetail)}
            vehicle={vehicleDetail}
            onClose={() => {
                setVehicleDetail(null);
            }}
        />
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

    return <div className={styles.layout}>
        {offer.canceled && <Heading text={"Nabídka smazána - " + offer.canceledReason?.toString()} headingLevel={3} />}
        {renderVehicleModal()}
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <LayoutFlexColumn>
                {currentBus && Number(currentBus.value) && <ButtonClick
                    controlled={true}
                    onClick={async () => {
                        showLoader();
                        const detailVehicle = await VehicleService.getPublicVehicle(Number(currentBus.value));
                        hideLoader();
                        setVehicleDetail(detailVehicle);
                    }}
                    label={"Vehicle Detail"}
                    type={ButtonType.YELLOW}
                    size={ButtonSize.BUTTON_SIZE_M}
                />}
            </LayoutFlexColumn>
            {_renderDateTimePicker()}
            <NumberBox
                placeholder={"Kolik"}
                controlled={true}
                value={priceAmount}
                minValue={1}
                onChange={(val) => {
                    if (val !== undefined) {
                        price.current.amount = val
                    } else {
                        price.current.amount = 1;
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
            <ButtonClick
                controlled={true}
                onClick={async () => {
                    const isValid = validate();
                    const vehicleId = currentBus ? Number(currentBus.value) : 0;
                    if (selectedEndOfferDate && isValid && vehicleId) {
                        showLoader();
                        try {
                            await TripOfferService.updateOffer({
                                tripId: trip.id,
                                offerId: offer.id,
                                offer: {
                                    vehicleId: vehicleId,
                                    price: {
                                        amount: priceAmount || 0,
                                        currency: Currency.CZK
                                    },
                                    endOfferDate: selectedEndOfferDate,
                                }
                            });
                        } catch (e) {
                            alert(getApiErrorMessage(e));
                        }
                        hideLoader();
                        onChangeOffer();
                    } else {
                        alert("User settings is not valid");
                    }
                }}
                isDisabled={selectedEndOfferDate === null}
                label={offer.canceled ? "Znovu podat" : "Prodloužit nabídku"}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
            {!offer.canceled && <ButtonClick
                controlled={true}
                onClick={async () => {
                    showLoader();
                    try {
                        await TripOfferService.deleteOffer({
                            tripId: trip.id,
                            vehicleId: offer.vehicle.id
                        });
                    } catch (e) {
                        alert(getApiErrorMessage(e));
                    }
                    hideLoader();
                    onChangeOffer();
                }}
                isDisabled={selectedEndOfferDate === null}
                label={"Smazat nabídku"}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />}
        </LayoutFlexColumn>

    </div>
});