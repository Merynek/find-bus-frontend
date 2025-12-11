import {Offer} from "@/src/data/offer";
import React, {useState} from "react";
import styles from "./trip-offer-accept.module.scss";
import {observer} from "mobx-react";
import {Trip} from "@/src/data/trip/trip";
import {ComboBox, IComboBoxItem} from "../../../components/inputs/combo-box/combo-box";
import {runInAction} from "mobx";
import {TripOfferAcceptMethod} from "@/src/api/openapi";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import moment from "moment";
import {TripOfferService} from "@/src/services/TripOfferService";
import {useApp} from "@/src/context/AppContext";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {getApiErrorMessage} from "@/src/utils/handleApiErrors";

export interface ITripOfferAcceptProps {
    offer: Offer;
    trip: Trip;
    onAcceptOffer: () => void;
    config: AppBusinessConfig;
}

export const TripOfferAccept = observer((props: ITripOfferAcceptProps) => {
    const {offer, onAcceptOffer, trip, config} = props;
    const {showLoader, hideLoader} = useApp();
    const _createAcceptMethodOption = (method: TripOfferAcceptMethod): IComboBoxItem<string> => {
        return {
            label: method,
            value: method
        }
    }
    const _createAcceptMethodOptions = (): IComboBoxItem<string>[] => {
        const options: IComboBoxItem<string>[] = [];

        if (trip && trip.dateFrom) {
            const start = moment(trip.dateFrom);
            const end = moment(trip.endOrder);
            const duration = moment.duration(start.diff(end));
            if (duration.asHours() > config.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours) {
                options.push(_createAcceptMethodOption(TripOfferAcceptMethod.PAY_DEPOSIT));
            }
        }
        options.push(_createAcceptMethodOption(TripOfferAcceptMethod.PAY_FULL));

        return options;
    }
    const methods = _createAcceptMethodOptions();
    const [acceptMethod, setAcceptMethod] = useState<TripOfferAcceptMethod>(TripOfferAcceptMethod.PAY_DEPOSIT);

    return <div className={styles.layout}>
        <ComboBox
            instanceId={"acceptMethod"}
            controlled={true}
            items={methods}
            value={methods.find(i => i.value === acceptMethod)}
            onChange={(item) => {
                runInAction(() => {
                    setAcceptMethod(item.value as TripOfferAcceptMethod);
                })
            }}
        />
        <ButtonClick
            controlled={true}
            onClick={async () => {
                showLoader();
                try {
                    await TripOfferService.acceptOffer({
                        offerId: offer.id,
                        acceptMethod: acceptMethod,
                        clientRowVersion: offer.clientRowVersion
                    });
                } catch (e) {
                    alert(getApiErrorMessage(e));
                }
                hideLoader();
                onAcceptOffer();
            }}
            label={"Přijat nabídku"}
            type={ButtonType.BLACK}
            size={ButtonSize.BY_CONTENT}
        />
    </div>
});