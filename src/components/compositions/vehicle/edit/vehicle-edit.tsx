import React, {useActionState, useEffect} from "react";
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {VehicleEditStore} from "./vehicle-edit.store";
import { FormDataEnum } from "@/src/enums/form-data.enum";
import {vehicleFormAction} from "@/src/app/actions/forms/vehicle/vehicleFormAction";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";

export interface IVehicleEditProps {
    store: VehicleEditStore;
    onClose: () => void;
}

export default function VehicleForm(props: IVehicleEditProps) {
    const {store, onClose} = props;
    const isEdit = store.id !== undefined;
    const [state, action, pending] = useActionState(vehicleFormAction, undefined)

    useEffect(() => {
        if (state && !state?.errors) {
            onClose?.();
        }
    }, [state, onClose]);

    return (
        <form action={action} className="space-y-6">
            {store.id && (
                <input type="hidden" name={FormDataEnum.vehicleId} value={store.id} />
            )}

            <div>
                <label>Název vozidla</label>
                <input
                    name={FormDataEnum.name}
                    defaultValue={store.name}
                    className="input"
                />
            </div>

            <div>
                <label>Počet osob</label>
                <input
                    type="number"
                    name={FormDataEnum.personsCapacity}
                    defaultValue={store.personsCapacity}
                    className="input"
                />
            </div>

            <div>
                <label>Počet handicapovaných osob</label>
                <input
                    type="number"
                    name={FormDataEnum.handicappedUserCount}
                    defaultValue={store.handicappedUserCount}
                    className="input"
                />
            </div>

            <div>
                <label>Rok výroby</label>
                <input
                    type="number"
                    name={FormDataEnum.yearOfManufacture}
                    defaultValue={store.yearOfManufacture}
                    className="input"
                />
            </div>

            <div>
                <label>VIN</label>
                <input
                    name={FormDataEnum.vin}
                    defaultValue={store.VIN}
                    className="input"
                />
            </div>

            <div>
                <label>SPZ</label>
                <input
                    name={FormDataEnum.registrationSign}
                    defaultValue={store.registrationSign}
                    className="input"
                />
            </div>

            <div>
                <label>STK expirace</label>
                <input
                    type="date"
                    name={FormDataEnum.stkExpired}
                    defaultValue={store.stkExpired?.toString()}
                    className="input"
                />
            </div>

            <div>
                <label>Euro norma</label>
                <select
                    name={FormDataEnum.euro}
                    defaultValue={store.euro}
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
                            defaultChecked={store.amenities.includes(amenity)}
                        /> {amenity}
                    </label>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ImageUploader
                    label={"frontPhoto"}
                    inputName={FormDataEnum.frontPhoto}
                />
                <ImageUploader
                    label={"rearPhoto"}
                    inputName={FormDataEnum.rearPhoto}
                />
                <ImageUploader
                    label={"leftSidePhoto"}
                    inputName={FormDataEnum.leftSidePhoto}
                />
                <ImageUploader
                    label={"rightSidePhoto"}
                    inputName={FormDataEnum.rightSidePhoto}
                />
                <ImageUploader
                    label={"interierPhoto1"}
                    inputName={FormDataEnum.interierPhoto1}
                />
                <ImageUploader
                    label={"interierPhoto2"}
                    inputName={FormDataEnum.interierPhoto2}
                />
                <ImageUploader
                    label={"technicalCertificate1"}
                    inputName={FormDataEnum.technicalCertificate1}
                />
                <ImageUploader
                    label={"technicalCertificate2"}
                    inputName={FormDataEnum.technicalCertificate2}
                />
                <ImageUploader
                    label={"insurance"}
                    inputName={FormDataEnum.insurance}
                />
            </div>

            {/* Departure station (simplified version, ideally handled by map UI) */}
            <div>
                <label>Stanice odjezdu (ID místa)</label>
                <input
                    name={FormDataEnum.departureStation_placeId}
                    defaultValue={store.departureStation?.placeId}
                    className="input"
                />
            </div>

            <input
                type="hidden"
                name={FormDataEnum.departureStation_point_lat}
                defaultValue={store.departureStation?.point?.lat}
                value={store.departureStation?.point?.lat}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_point_lng}
                defaultValue={store.departureStation?.point?.lng}
                value={store.departureStation?.point?.lng}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_country}
                defaultValue={store.departureStation?.country}
                value={store.departureStation?.country}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_name}
                defaultValue={store.departureStation?.name}
                value={store.departureStation?.name}
            />
            <input
                type="hidden"
                name={FormDataEnum.departureStation_placeFormatted}
                defaultValue={store.departureStation?.placeFormatted}
                value={store.departureStation?.placeFormatted}
            />

            <button type="submit" className="btn btn-primary">
                {isEdit ? 'Upravit vozidlo' : 'Přidat vozidlo'}
            </button>
        </form>
    );
}
