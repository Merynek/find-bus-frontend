"use client";

import React, {useState} from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {Amenities, EuroStandard, VehicleResponseDto, VehiclePhotoType, VehicleDocumentType} from "@/src/api/openapi";
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
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {DatePicker} from "@/src/components/components/inputs/date-picker/date-picker";
import {PlaceAutocomplete} from "@/src/components/components/inputs/place-autocomplete/place-autocomplete";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";
import {FormActionEnum} from "@/src/enums/form-action.enum";
import FileGroupUploaderForm from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";
import {Image} from "@/src/data/media/Image";

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
            stkExpired: vehicle.stkExpired,
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

    const getPhotoItems = (type: VehiclePhotoType) => {
        const _inputs: {id: number; file: Image}[] = [];
        const _photos = vehicle.photos.filter(p => p.type === type);
        _photos.forEach(p => {
            if (p.file) {
                _inputs.push({
                    id: p.id,
                    file: p.file
                })
            }
        });
        return _inputs;
    }

    const getDocumentItems = (type: VehicleDocumentType) => {
        const _inputs: {id: number; file: Image}[] = [];
        const _documents = vehicle.documents.filter(p => p.type === type);
        _documents.forEach(p => {
            if (p.file) {
                _inputs.push({
                    id: p.id,
                    file: p.file
                })
            }
        });
        return _inputs;
    }

    const renderVehiclePhotos = () => {
        return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <Heading text={t("vehiclePhotos")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.FRONT)}
                    label={t("frontPhoto")}
                    typeValue={VehiclePhotoType.FRONT}
                    formFileUpload={FormDataEnum.imagesUpload}
                    formFileType={FormDataEnum.imagesType}
                    formIdsToDelete={FormDataEnum.photoIdsToDelete}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.REAR)}
                    label={t("rearPhoto")}
                    typeValue={VehiclePhotoType.REAR}
                    formFileUpload={FormDataEnum.imagesUpload}
                    formFileType={FormDataEnum.imagesType}
                    formIdsToDelete={FormDataEnum.photoIdsToDelete}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.LEFT_SIDE)}
                    label={t("leftSidePhoto")}
                    typeValue={VehiclePhotoType.LEFT_SIDE}
                    formFileUpload={FormDataEnum.imagesUpload}
                    formFileType={FormDataEnum.imagesType}
                    formIdsToDelete={FormDataEnum.photoIdsToDelete}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.RIGHT_SIDE)}
                    label={t("rightSidePhoto")}
                    typeValue={VehiclePhotoType.RIGHT_SIDE}
                    formFileUpload={FormDataEnum.imagesUpload}
                    formFileType={FormDataEnum.imagesType}
                    formIdsToDelete={FormDataEnum.photoIdsToDelete}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.INTERIOR)}
                    label={t("interiorPhoto")}
                    typeValue={VehiclePhotoType.INTERIOR}
                    formFileUpload={FormDataEnum.imagesUpload}
                    formFileType={FormDataEnum.imagesType}
                    formIdsToDelete={FormDataEnum.photoIdsToDelete}
                />
                <FileGroupUploaderForm
                    files={getDocumentItems(VehicleDocumentType.TECHNICAL_CERTIFICATE)}
                    label={t("technicalCertificate")}
                    typeValue={VehicleDocumentType.TECHNICAL_CERTIFICATE}
                    formFileUpload={FormDataEnum.documentsUpload}
                    formFileType={FormDataEnum.documentsType}
                    formIdsToDelete={FormDataEnum.documentIdsToDelete}
                />
                <FileGroupUploaderForm
                    files={getDocumentItems(VehicleDocumentType.INSURANCE)}
                    label={t("insurance")}
                    typeValue={VehicleDocumentType.INSURANCE}
                    formFileUpload={FormDataEnum.documentsUpload}
                    formFileType={FormDataEnum.documentsType}
                    formIdsToDelete={FormDataEnum.documentIdsToDelete}
                />
            </LayoutFlexColumn>
        </LayoutFlexColumn>
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("vehicleEditHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <div style={{backgroundColor: "aquamarine"}}>
            {vehicle.status.toString()}
        </div>
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
                    name={FormDataEnum.formActionType}
                    value={FormActionEnum.SAVE}
                    isDisabled={pending}
                    label={t("saveVehicle")}
                />
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    name={FormDataEnum.formActionType}
                    value={FormActionEnum.SAVE_AND_VERIFY}
                    isDisabled={pending}
                    label={t("saveAndPostToVerification")}
                />
            </LayoutFlexColumn>
        </form>
    </LayoutFlexColumn>
};

export default VehicleEditPage;
