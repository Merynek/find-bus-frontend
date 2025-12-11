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
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";
import {getApiErrorMessage} from "@/src/utils/handleApiErrors";
import {VehicleDetailModal} from "@/src/components/compositions/vehicle/modal-vehicle-detail/vehicle-detail-modal";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {VehicleService} from "@/src/services/VehicleService";

interface ITripChangeOfferProps {
    trip: Trip;
    offer: Offer;
    onChangeOffer: () => void;
    userSettings: UserSettings;
}

export const TripChangeOffer = observer((props: ITripChangeOfferProps) => {
    const {trip, onChangeOffer, offer, userSettings} = props;
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
        {renderVehicleModal()}
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <LayoutFlexColumn>
                <Text text={"Vozidlo: " + offer.vehicle.name} fontSize={FontSize.BASE_14} />
                <ButtonClick
                    controlled={true}
                    onClick={async () => {
                        showLoader();
                        const detailVehicle = await VehicleService.getPublicVehicle(offer.vehicle.id);
                        hideLoader();
                        setVehicleDetail(detailVehicle);
                    }}
                    label={"Vehicle Detail"}
                    type={ButtonType.YELLOW}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
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
            <ButtonClick
                controlled={true}
                onClick={async () => {
                    const isValid = validate();
                    if (selectedEndOfferDate && isValid) {
                        showLoader();
                        try {
                            await TripOfferService.updateOffer({
                                offerId: offer.id,
                                endOfferDate: selectedEndOfferDate,
                                price: {
                                    amount: priceAmount || 0,
                                    currency: Currency.CZK
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
                label={"Prodloužit nabídku"}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
            <ButtonClick
                controlled={true}
                onClick={async () => {
                    showLoader();
                    try {
                        await TripOfferService.deleteOffer(trip.id);
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
            />
        </LayoutFlexColumn>

    </div>
});