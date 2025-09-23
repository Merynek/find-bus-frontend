import React, {useEffect, useState} from "react";
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {VehicleEditStore} from "./vehicle-edit.store";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {vehicleFormAction} from "@/src/app/actions/forms/vehicle/vehicleFormAction";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {Place} from "@/src/data/place";
import {PlaceAutocomplete} from "@/src/components/components/inputs/place-autocomplete/place-autocomplete";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {DatePicker} from "@/src/components/components/inputs/date-picker/date-picker";
import {ComboBox, IComboBoxItem} from "@/src/components/components/inputs/combo-box/combo-box";
import {CheckBox} from "@/src/components/components/inputs/check-box/check-box";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";

export interface IVehicleEditProps {
    store: VehicleEditStore;
    onClose: () => void;
}

export default function VehicleForm(props: IVehicleEditProps) {
    const {store, onClose} = props;
    const {t} = useTranslate("page.vehicle");
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

    const getEuroStandardOptions = (): IComboBoxItem<string>[] => {
        const options: IComboBoxItem<string>[] = [];
        Object.values(EuroStandard).map((euro) => (
            options.push({
                value: euro,
                label: euro
            })
        ))
        return options;
    }

    const euroStandardOptions = getEuroStandardOptions();

    useEffect(() => {
        if (state && !state?.schemaErrors && state.success === true) {
            onClose?.();
        }
    }, [state, onClose]);

    const renderAmenities = () => {
        return <LayoutFlexColumn>
            <Heading text={t("amenities")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <LayoutFlexRow canWrap={true} gap={FlexGap.SMALL_16}>
                {Object.values(Amenities).map((amenity, index) => {
                    const amenities = state?.data?.amenities || [];
                    return <CheckBox
                        controlled={false}
                        key={index}
                        label={amenity}
                        value={amenity}
                        id={`${FormDataEnum.amenities}-${amenity}`}
                        name={FormDataEnum.amenities}
                        defaultChecked={amenities.includes(amenity)}
                    />
                })}
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    const renderVehiclePhotos = () => {
        return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <Heading text={t("vehiclePhotos")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
                <ImageUploader
                    label={t("frontPhoto")}
                    inputName={FormDataEnum.frontPhoto}
                    initialImage={store.frontPhoto?.path}
                />
                <ImageUploader
                    label={t("rearPhoto")}
                    inputName={FormDataEnum.rearPhoto}
                    initialImage={store.rearPhoto?.path}
                />
                <ImageUploader
                    label={t("leftSidePhoto")}
                    inputName={FormDataEnum.leftSidePhoto}
                    initialImage={store.leftSidePhoto?.path}
                />
                <ImageUploader
                    label={t("rightSidePhoto")}
                    inputName={FormDataEnum.rightSidePhoto}
                    initialImage={store.rightSidePhoto?.path}
                />
                <ImageUploader
                    label={t("interierPhoto1")}
                    inputName={FormDataEnum.interierPhoto1}
                    initialImage={store.interierPhoto1?.path}
                />
                <ImageUploader
                    label={t("interierPhoto2")}
                    inputName={FormDataEnum.interierPhoto2}
                    initialImage={store.interierPhoto2?.path}
                />
                <ImageUploader
                    label={t("technicalCertificate1")}
                    inputName={FormDataEnum.technicalCertificate1}
                    initialImage={store.technicalCertificate1?.path}
                />
                <ImageUploader
                    label={t("technicalCertificate2")}
                    inputName={FormDataEnum.technicalCertificate2}
                    initialImage={store.technicalCertificate2?.path}
                />
                <ImageUploader
                    label={t("insurance")}
                    inputName={FormDataEnum.insurance}
                    initialImage={store.insurancePhoto?.path}
                />
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={isEdit ? t("vehicleEditHeading") : t("vehicleAddHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <form action={action}>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state}/>
                {store.id && (
                    <input type="hidden" name={FormDataEnum.vehicleId} value={store.id}/>
                )}
                <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
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
                <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                    <TextBox
                        controlled={false}
                        name={FormDataEnum.name}
                        id={FormDataEnum.name}
                        type={TextBoxType.TEXT}
                        placeholder={t("name")}
                        defaultValue={state?.data?.name || ""}
                    />
                    <NumberBox
                        placeholder={t("personsCapacity")}
                        controlled={false}
                        id={FormDataEnum.personsCapacity}
                        name={FormDataEnum.personsCapacity}
                        defaultValue={state?.data?.personsCapacity || 0}
                        minValue={0}
                    />
                    <NumberBox
                        placeholder={t("handicappedUserCount")}
                        controlled={false}
                        id={FormDataEnum.handicappedUserCount}
                        name={FormDataEnum.handicappedUserCount}
                        defaultValue={state?.data?.handicappedUserCount || 0}
                        minValue={0}
                    />
                    <NumberBox
                        placeholder={t("yearOfManufacture")}
                        controlled={false}
                        id={FormDataEnum.yearOfManufacture}
                        name={FormDataEnum.yearOfManufacture}
                        defaultValue={state?.data?.yearOfManufacture || 0}
                        minValue={0}
                    />
                    <TextBox
                        controlled={false}
                        name={FormDataEnum.vin}
                        id={FormDataEnum.vin}
                        type={TextBoxType.TEXT}
                        placeholder={t("vin")}
                        defaultValue={state?.data?.vin || ""}
                    />
                    <TextBox
                        controlled={false}
                        name={FormDataEnum.registrationSign}
                        id={FormDataEnum.registrationSign}
                        type={TextBoxType.TEXT}
                        placeholder={t("registrationSign")}
                        defaultValue={state?.data?.registrationSign || ""}
                    />
                    <DatePicker
                        controlled={false}
                        id={FormDataEnum.stkExpired}
                        name={FormDataEnum.stkExpired}
                        placeholderText={t("stkExpired")}
                        defaultValue={state?.data?.stkExpired || undefined}
                        locale={locale}
                    />
                    <ComboBox
                        controlled={false}
                        items={euroStandardOptions}
                        defaultValue={euroStandardOptions.find(i => i.value === state?.data?.euro)}
                        id={FormDataEnum.euro}
                        name={FormDataEnum.euro}
                        placeHolder={t("euro")}
                        instanceId={"euro"}
                    />
                    {renderAmenities()}
                    <PlaceAutocomplete
                        place={departureStation}
                        onChange={setDepartureStation}
                        placeHolder={t("departureStation")}
                    />
                    {renderVehiclePhotos()}
                </LayoutFlexColumn>
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    isDisabled={pending}
                    label={isEdit ? t("saveVehicle") : t("addVehicle")}
                />
            </LayoutFlexColumn>
        </form>
    </LayoutFlexColumn>
}
