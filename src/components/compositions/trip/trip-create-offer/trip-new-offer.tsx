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
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripOfferService} from "@/src/services/TripOfferService";
import {useApp} from "@/src/context/AppContext";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {PriceConverter} from "@/src/converters/price-converter";
import {FlexGap} from "@/src/enums/layout.enum";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {getApiErrorMessage} from "@/src/utils/handleApiErrors";
import {Heading} from "@/src/components/components/texts/heading";

interface ITripNewOfferProps {
    trip: Trip;
    onNewOffer: () => void;
    userSettings: UserSettings;
    availableVehicles: Vehicle[];
}

interface IBusComboItem {
    value: string;
    label: string;
}

export const TripNewOffer = observer((props: ITripNewOfferProps) => {
    const {trip, onNewOffer, userSettings, availableVehicles} = props;
    const {showLoader, hideLoader} = useApp();
    const locale = useCurrentLocale();

    const price = useRef(Price.create());
    const [selectedEndOfferDate, setSelectedEndOfferDate] = useState<Date|null>(props.trip.endOrder || null);
    const [currentBus, setCurrentBus] = useState<IBusComboItem|undefined>(undefined);
    const [priceAmount, setPriceAmount] = useState<number|undefined>(undefined);

    const getBusItems = (): IBusComboItem[] => {
        return availableVehicles.map(vehicle => {
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
        return new Date();
    }

    const maxDate = (): Date|null => {
        return trip.endOrder || null;
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
        <Heading text={"Nová Nabídka"} headingLevel={2} />
        <LayoutFlexColumn gap={FlexGap.LARGE_32}>
            <NumberBox
                placeholder={"Kolik"}
                controlled={true}
                value={priceAmount === undefined ? undefined : price.current.amount}
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
            {_renderDateTimePicker()}
            <ButtonClick
                controlled={true}
                type={ButtonType.BLACK}
                onClick={async () => {
                    const isValid = validate();
                    if (isValid && selectedEndOfferDate) {
                        showLoader();
                        try {
                            await TripOfferService.createOffer({
                                tripId: trip.id,
                                changeOffer: {
                                    vehicleId: currentBus ? Number(currentBus.value) : 0,
                                    price: PriceConverter.toJson(price.current),
                                    endOfferDate: selectedEndOfferDate
                                }
                            });
                        } catch (e) {
                            alert(getApiErrorMessage(e));
                        }
                        hideLoader();
                        onNewOffer();
                    } else {
                        alert("User settings is not valid");
                    }
                }}
                label={"Nabídnout"}
                size={ButtonSize.BY_CONTENT}
            />
        </LayoutFlexColumn>
    </div>
});