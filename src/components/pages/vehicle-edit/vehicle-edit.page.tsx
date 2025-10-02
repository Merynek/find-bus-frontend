"use client";

import React, {useEffect, useState} from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {Amenities, EuroStandard, VehicleResponseDto} from "@/src/api/openapi";
import { VehicleConverter } from "@/src/converters/vehicle-converter";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {vehicleFormAction} from "@/src/server-actions/forms/vehicle/vehicleFormAction";
import {Place} from "@/src/data/place";
import {ComboBox, IComboBoxItem} from "@/src/components/components/inputs/combo-box/combo-box";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";
import {CheckBox} from "@/src/components/components/inputs/check-box/check-box";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {DatePicker} from "@/src/components/components/inputs/date-picker/date-picker";
import {PlaceAutocomplete} from "@/src/components/components/inputs/place-autocomplete/place-autocomplete";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";

interface IVehicleEditPageProps {
    vehicle: VehicleResponseDto;
}

const VehicleEditPage = (props: IVehicleEditPageProps) => {
    const id = props.vehicle.id;
    const vehicle = VehicleConverter.toInstance(props.vehicle);
    const {t} = useTranslate("page.vehicle");
    const [state, action, pending] = useFormActionState(vehicleFormAction, {
        data: {
            name: vehicle.name,
            personsCapacity: vehicle.personsCapacity,
            euro: vehicle.euro,
            amenities: vehicle.amenities,
            handicappedUserCount: vehicle.handicappedUserCount,
            vin: vehicle.VIN,
            registrationSign: vehicle.registrationSign,
            stkExpired: vehicle.stkExpired || undefined,
            yearOfManufacture: vehicle.yearOfManufacture,
            departureStation: (vehicle.departureStation && vehicle.departureStation.placeFormatted && vehicle.departureStation.name && vehicle.departureStation.placeId && vehicle.departureStation.point && vehicle.departureStation.country) ? {
                name: vehicle.departureStation.name,
                placeId: vehicle.departureStation.placeId,
                point: {
                    lat: vehicle.departureStation.point.lat,
                    lng: vehicle.departureStation.point.lng
                },
                country: vehicle.departureStation.country,
                placeFormatted: vehicle.departureStation.placeFormatted
            }: undefined,
            vehicleId: id
        }
    });
    const [departureStation, setDepartureStation] = useState<Place|undefined>(vehicle.departureStation || undefined);
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
                    initialImage={vehicle.frontPhoto?.path}
                />
                <ImageUploader
                    label={t("rearPhoto")}
                    inputName={FormDataEnum.rearPhoto}
                    initialImage={vehicle.rearPhoto?.path}
                />
                <ImageUploader
                    label={t("leftSidePhoto")}
                    inputName={FormDataEnum.leftSidePhoto}
                    initialImage={vehicle.leftSidePhoto?.path}
                />
                <ImageUploader
                    label={t("rightSidePhoto")}
                    inputName={FormDataEnum.rightSidePhoto}
                    initialImage={vehicle.rightSidePhoto?.path}
                />
                <ImageUploader
                    label={t("interierPhoto1")}
                    inputName={FormDataEnum.interierPhoto1}
                    initialImage={vehicle.interierPhoto1?.path}
                />
                <ImageUploader
                    label={t("interierPhoto2")}
                    inputName={FormDataEnum.interierPhoto2}
                    initialImage={vehicle.interierPhoto2?.path}
                />
                <ImageUploader
                    label={t("technicalCertificate1")}
                    inputName={FormDataEnum.technicalCertificate1}
                    initialImage={vehicle.technicalCertificate1?.path}
                />
                <ImageUploader
                    label={t("technicalCertificate2")}
                    inputName={FormDataEnum.technicalCertificate2}
                    initialImage={vehicle.technicalCertificate2?.path}
                />
                <ImageUploader
                    label={t("insurance")}
                    inputName={FormDataEnum.insurance}
                    initialImage={vehicle.insurancePhoto?.path}
                />
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("vehicleEditHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <form action={action}>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state}/>
                <input type="hidden" name={FormDataEnum.vehicleId} value={id}/>
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
};

export default VehicleEditPage;