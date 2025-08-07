import React, {useEffect, useState} from "react";
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {VehicleEditStore} from "./vehicle-edit.store";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {vehicleFormAction} from "@/src/app/actions/forms/vehicle/vehicleFormAction";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {Place} from "@/src/data/place";
import {PlaceAutocomplete} from "@/src/components/components/inputs/place-autocomplete/place-autocomplete";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";

export interface IVehicleEditProps {
    store: VehicleEditStore;
    onClose: () => void;
}

export default function VehicleForm(props: IVehicleEditProps) {
    const {store, onClose} = props;
    const isEdit = store.id !== undefined;
    const [state, action, pending] = useFormActionState(vehicleFormAction, {
        data: {
            name: store.name,
            personsCapacity: store.personsCapacity,
            euro: store.euro,
            amenities: store.amenities,
            handicappedUserCount: store.handicappedUserCount,
            vin: store.VIN,
            registrationSign: store.registrationSign,
            stkExpired: store.stkExpired || undefined,
            yearOfManufacture: store.yearOfManufacture,
            departureStation: (store.departureStation && store.departureStation.placeFormatted && store.departureStation.name && store.departureStation.placeId && store.departureStation.point && store.departureStation.country) ? {
                name: store.departureStation.name,
                placeId: store.departureStation.placeId,
                point: {
                    lat: store.departureStation.point.lat,
                    lng: store.departureStation.point.lng
                },
                country: store.departureStation.country,
                placeFormatted: store.departureStation.placeFormatted
            }: undefined,
            vehicleId: store.id
        }
    });
    const [departureStation, setDepartureStation] = useState<Place|undefined>(store.departureStation || undefined);
    const locale = useCurrentLocale();


    const formatDateToYYYYMMDD = (date: Date | undefined): string => {
        if (!date) {
            return "";
        }
        // Zajištění, že máme objekt Date, pokud by přišel jako string
        const d = date instanceof Date ? date : new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Měsíce jsou 0-11
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formattedStkExpired = formatDateToYYYYMMDD(state?.data?.stkExpired);

    useEffect(() => {
        if (state && !state?.errors && state.success === true) {
            onClose?.();
        }
    }, [state, onClose]);

    return (
        <form action={action} className="space-y-6">
            <FormStatus state={state} />
            {store.id && (
                <input type="hidden" name={FormDataEnum.vehicleId} value={store.id}/>
            )}
            <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
            <div>
                <label>Název vozidla</label>
                <input
                    name={FormDataEnum.name}
                    defaultValue={state?.data?.name || ""}
                    className="input"
                />
            </div>

            <div>
                <label>Počet osob</label>
                <input
                    type="number"
                    name={FormDataEnum.personsCapacity}
                    defaultValue={state?.data?.personsCapacity || ""}
                    className="input"
                />
            </div>

            <div>
                <label>Počet handicapovaných osob</label>
                <input
                    type="number"
                    name={FormDataEnum.handicappedUserCount}
                    defaultValue={state?.data?.handicappedUserCount || ""}
                    className="input"
                />
            </div>

            <div>
                <label>Rok výroby</label>
                <input
                    type="number"
                    name={FormDataEnum.yearOfManufacture}
                    defaultValue={state?.data?.yearOfManufacture || ""}
                    className="input"
                />
            </div>

            <div>
                <label>VIN</label>
                <input
                    name={FormDataEnum.vin}
                    defaultValue={state?.data?.vin || ""}
                    className="input"
                />
            </div>

            <div>
                <label>SPZ</label>
                <input
                    name={FormDataEnum.registrationSign}
                    defaultValue={state?.data?.registrationSign || ""}
                    className="input"
                />
            </div>

            <div>
                <label>STK expirace</label>
                <input
                    type="date"
                    name={FormDataEnum.stkExpired}
                    defaultValue={formattedStkExpired}
                    className="input"
                />
            </div>

            <div>
                <label>Euro norma</label>
                <select
                    name={FormDataEnum.euro}
                    defaultValue={state?.data?.euro}
                    className="input"
                >
                    {Object.values(EuroStandard).map((euro) => (
                        <option key={euro} value={euro}>{euro}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Vybavení</label>
                {Object.values(Amenities).map((amenity) => (
                    <label key={amenity} className="block">
                        <input
                            type="checkbox"
                            name={FormDataEnum.amenities}
                            value={amenity}
                            defaultChecked={state?.data?.amenities?.includes(amenity)}
                        /> {amenity}
                    </label>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ImageUploader
                    label={"frontPhoto"}
                    inputName={FormDataEnum.frontPhoto}
                    initialImage={store.frontPhoto?.path}
                />
                <ImageUploader
                    label={"rearPhoto"}
                    inputName={FormDataEnum.rearPhoto}
                    initialImage={store.rearPhoto?.path}
                />
                <ImageUploader
                    label={"leftSidePhoto"}
                    inputName={FormDataEnum.leftSidePhoto}
                    initialImage={store.leftSidePhoto?.path}
                />
                <ImageUploader
                    label={"rightSidePhoto"}
                    inputName={FormDataEnum.rightSidePhoto}
                    initialImage={store.rightSidePhoto?.path}
                />
                <ImageUploader
                    label={"interierPhoto1"}
                    inputName={FormDataEnum.interierPhoto1}
                    initialImage={store.interierPhoto1?.path}
                />
                <ImageUploader
                    label={"interierPhoto2"}
                    inputName={FormDataEnum.interierPhoto2}
                    initialImage={store.interierPhoto2?.path}
                />
                <ImageUploader
                    label={"technicalCertificate1"}
                    inputName={FormDataEnum.technicalCertificate1}
                    initialImage={store.technicalCertificate1?.path}
                />
                <ImageUploader
                    label={"technicalCertificate2"}
                    inputName={FormDataEnum.technicalCertificate2}
                    initialImage={store.technicalCertificate2?.path}
                />
                <ImageUploader
                    label={"insurance"}
                    inputName={FormDataEnum.insurance}
                    initialImage={store.insurancePhoto?.path}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Stanice odjezdu</label>
                <PlaceAutocomplete
                    place={departureStation}
                    onChange={setDepartureStation}
                    placeHolder="Vyhledejte stanici odjezdu"
                />
            </div>

            <input
                type="hidden"
                name={FormDataEnum.departureStation_placeId}
                value={departureStation?.placeId || ''}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_point_lat}
                value={departureStation?.point?.lat || ''}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_point_lng}
                value={departureStation?.point?.lng || ''}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_country}
                value={departureStation?.country || ''}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_name}
                value={departureStation?.name || ''}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_placeFormatted}
                value={departureStation?.placeFormatted || ''}
            />

            <button type="submit" className="btn btn-primary" disabled={pending}>
                {isEdit ? 'Upravit vozidlo' : 'Přidat vozidlo'}
            </button>
        </form>
    );
}
