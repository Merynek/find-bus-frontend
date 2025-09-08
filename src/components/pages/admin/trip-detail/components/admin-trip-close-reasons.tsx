import {Trip} from "@/src/data/trip/trip";
import React from "react";
import {ComboBox, IComboBoxItem} from "@/src/components/components/inputs/combo-box/combo-box";
import {CloseTripOfferReason, TripOfferState} from "@/src/api/openapi";
import {observer} from "mobx-react";

interface IAdminTripCloseReasonsProps {
    trip: Trip;
    reason: CloseTripOfferReason;
    onChange: (reason: CloseTripOfferReason) => void;
}

export const AdminTripCloseReasons = observer((props: IAdminTripCloseReasonsProps) => {
    const {trip, reason, onChange} = props;
    const _createReasonOption = (reason: CloseTripOfferReason): IComboBoxItem<string> => {
        return {
            label: reason,
            value: reason
        }
    }
    const _createOptions = (): IComboBoxItem<string>[] => {
        const options: IComboBoxItem<string>[] = [];
        switch (trip.offerState) {
            case TripOfferState.ACCEPTED_TRANSPORTER_PAY_DEPOSIT:
            case TripOfferState.ACCEPTED_TRANSPORTER_PAY_FULL:
            case TripOfferState.PAYED_DEPOSIT:
                options.push(_createReasonOption(CloseTripOfferReason.GENERAL));
                options.push(_createReasonOption(CloseTripOfferReason.TRANSPORTER_GENERAL));
                options.push(_createReasonOption(CloseTripOfferReason.DEMANDER_GENERAL));
                options.push(_createReasonOption(CloseTripOfferReason.DEMANDER_UNPAID));
                break;
            case TripOfferState.PAYED_FULL:
                options.push(_createReasonOption(CloseTripOfferReason.GENERAL));
                options.push(_createReasonOption(CloseTripOfferReason.TRANSPORTER_GENERAL));
                options.push(_createReasonOption(CloseTripOfferReason.DEMANDER_GENERAL));
                break;
        }

        return options;
    }
    const options = _createOptions();

    return <ComboBox
        instanceId={"reason"}
        controlled={true}
        items={options}
        value={options.find(i => i.value === reason)}
        onChange={(item) => {
            onChange(item.value as CloseTripOfferReason);
        }}
    />
});