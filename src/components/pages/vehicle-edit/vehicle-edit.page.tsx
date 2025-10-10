"use client";

import React, {useState} from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {
    Amenities,
    EuroStandard,
    VehicleDocumentType,
    VehiclePhotoType,
    VehicleResponseDto,
    VehicleStatus
} from "@/src/api/openapi";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {vehicleFormAction} from "@/src/server-actions/forms/vehicle/vehicleFormAction";
import {Place} from "@/src/data/place";
import {ComboBox, IComboBoxItem} from "@/src/components/components/inputs/combo-box/combo-box";
import {Heading} from "@/src/components/components/texts/heading";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
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
import {Text} from "@/src/components/components/texts/text";
import {generateId} from "@/src/utils/common";
import {FileUploaderService, IDocumentUploadItem, IPhotoUploadItem} from "@/src/singletons/FileUploaderService";
import uniq from "lodash/uniq";
import FileGroupUploaderForm, {
    IFileGroupUploaderItem
} from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";

interface IVehicleEditPageProps {
    vehicle: VehicleResponseDto;
}

interface IPhotoItem extends IFileGroupUploaderItem {
    type: VehiclePhotoType;
}
interface IDocumentItem extends IFileGroupUploaderItem {
    type: VehicleDocumentType;
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
    const createPhotos = (): IPhotoItem[] => {
        const _items: IPhotoItem[] = [];
        vehicle.photos.forEach(p => {
            if (p.image) {
                _items.push({
                    id: p.id.toString(),
                    dbId: p.id,
                    path: p.image.path,
                    file: p.image.file,
                    type: p.type
                })
            }
        });
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined,
            type: VehiclePhotoType.FRONT
        })
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined,
            type: VehiclePhotoType.REAR
        })
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined,
            type: VehiclePhotoType.LEFT_SIDE
        })
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined,
            type: VehiclePhotoType.RIGHT_SIDE
        })
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined,
            type: VehiclePhotoType.INTERIOR
        })
        return _items;
    }

    const createDocuments = (): IDocumentItem[] => {
        const _items: IDocumentItem[] = [];
        vehicle.documents.forEach(d => {
            if (d.image) {
                _items.push({
                    id: d.id.toString(),
                    dbId: d.id,
                    path: d.image.path,
                    file: d.image.file,
                    type: d.type
                })
            }
        });
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined,
            type: VehicleDocumentType.INSURANCE
        })
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined,
            type: VehicleDocumentType.TECHNICAL_CERTIFICATE
        })
        return _items;
    }

    const [departureStation, setDepartureStation] = useState<Place|undefined>(vehicle.departureStation || undefined);
    const [photos, setPhotos] = useState<IPhotoItem[]>(createPhotos());
    const [documents, setDocuments] = useState<IDocumentItem[]>(createDocuments());
    const [photoIdsToDelete, setPhotoIdsToDelete] = useState<number[]>([]);
    const [documentIdsToDelete, setDocumentIdsToDelete] = useState<number[]>([]);
    const locale = useCurrentLocale();

    const uploadFiles = async () => {
        const _photos: IPhotoUploadItem[] = [];
        const _documents: IDocumentUploadItem[] = [];
        photos.forEach(p => {
            if (p.file && p.dbId === undefined) {
                _photos.push({
                    clientFileId: p.id,
                    file: p.file,
                    type: p.type
                })
            }
        });
        documents.forEach(d => {
            if (d.file && d.dbId === undefined) {
                _documents.push({
                    clientFileId: d.id,
                    file: d.file,
                    type: d.type
                })
            }
        });
        await FileUploaderService.uploadVehicleFiles(vehicle.id, _photos, _documents, uniq(photoIdsToDelete), uniq(documentIdsToDelete));
    }

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
        return photos.filter(p => p.type === type);
    }

    const getDocumentItems = (type: VehicleDocumentType) => {
        return documents.filter(p => p.type === type);
    }

    console.log("Photos", photos);
    console.log("PhotosToDelete", photoIdsToDelete);
    console.log("Documents", documents);
    console.log("DocumentIdsToDelete", documentIdsToDelete);

    const renderVehiclePhotos = () => {
        return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <Heading text={t("vehiclePhotos")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.FRONT)}
                    deleteIds={photoIdsToDelete}
                    label={t("frontPhoto")}
                    onChange={(items, deleteIds) => {
                        const cleanItems = photos.filter(p => p.type !== VehiclePhotoType.FRONT);
                        const newItems = items.map(i => {
                            return {
                                ...i,
                                type: VehiclePhotoType.FRONT
                            }
                        })
                        setPhotos([...cleanItems, ...newItems]);
                        setPhotoIdsToDelete([...photoIdsToDelete, ...deleteIds]);
                    }}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.REAR)}
                    deleteIds={photoIdsToDelete}
                    label={t("rearPhoto")}
                    onChange={(items, deleteIds) => {
                        const cleanItems = photos.filter(p => p.type !== VehiclePhotoType.REAR);
                        const newItems = items.map(i => {
                            return {
                                ...i,
                                type: VehiclePhotoType.REAR
                            }
                        })
                        setPhotos([...cleanItems, ...newItems]);
                        setPhotoIdsToDelete([...photoIdsToDelete, ...deleteIds]);
                    }}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.LEFT_SIDE)}
                    deleteIds={photoIdsToDelete}
                    label={t("leftSidePhoto")}
                    onChange={(items, deleteIds) => {
                        const cleanItems = photos.filter(p => p.type !== VehiclePhotoType.LEFT_SIDE);
                        const newItems = items.map(i => {
                            return {
                                ...i,
                                type: VehiclePhotoType.LEFT_SIDE
                            }
                        })
                        setPhotos([...cleanItems, ...newItems]);
                        setPhotoIdsToDelete([...photoIdsToDelete, ...deleteIds]);
                    }}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.RIGHT_SIDE)}
                    deleteIds={photoIdsToDelete}
                    label={t("rightSidePhoto")}
                    onChange={(items, deleteIds) => {
                        const cleanItems = photos.filter(p => p.type !== VehiclePhotoType.RIGHT_SIDE);
                        const newItems = items.map(i => {
                            return {
                                ...i,
                                type: VehiclePhotoType.RIGHT_SIDE
                            }
                        })
                        setPhotos([...cleanItems, ...newItems]);
                        setPhotoIdsToDelete([...photoIdsToDelete, ...deleteIds]);
                    }}
                />
                <FileGroupUploaderForm
                    files={getPhotoItems(VehiclePhotoType.INTERIOR)}
                    deleteIds={photoIdsToDelete}
                    label={t("interiorPhoto")}
                    onChange={(items, deleteIds) => {
                        const cleanItems = photos.filter(p => p.type !== VehiclePhotoType.INTERIOR);
                        const newItems = items.map(i => {
                            return {
                                ...i,
                                type: VehiclePhotoType.INTERIOR
                            }
                        })
                        setPhotos([...cleanItems, ...newItems]);
                        setPhotoIdsToDelete([...photoIdsToDelete, ...deleteIds]);
                    }}
                />
                <FileGroupUploaderForm
                    files={getDocumentItems(VehicleDocumentType.INSURANCE)}
                    deleteIds={documentIdsToDelete}
                    label={t("insurance")}
                    onChange={(items, deleteIds) => {
                        const cleanItems = documents.filter(p => p.type !== VehicleDocumentType.INSURANCE);
                        const newItems = items.map(i => {
                            return {
                                ...i,
                                type: VehicleDocumentType.INSURANCE
                            }
                        })
                        setDocuments([...cleanItems, ...newItems]);
                        setDocumentIdsToDelete([...documentIdsToDelete, ...deleteIds]);
                    }}
                />
                <FileGroupUploaderForm
                    files={getDocumentItems(VehicleDocumentType.TECHNICAL_CERTIFICATE)}
                    deleteIds={documentIdsToDelete}
                    label={t("technicalCertificate")}
                    onChange={(items, deleteIds) => {
                        const cleanItems = documents.filter(p => p.type !== VehicleDocumentType.TECHNICAL_CERTIFICATE);
                        const newItems = items.map(i => {
                            return {
                                ...i,
                                type: VehicleDocumentType.TECHNICAL_CERTIFICATE
                            }
                        })
                        setDocuments([...cleanItems, ...newItems]);
                        setDocumentIdsToDelete([...documentIdsToDelete, ...deleteIds]);
                    }}
                />
            </LayoutFlexColumn>
        </LayoutFlexColumn>
    }

    const renderWarningTextDependOnStatus = () => {
        switch (vehicle.status) {
            case VehicleStatus.VERIFIED:
                return <div style={{color: "red"}}>{"Při uložení se vám zneplatní verifikace tohoto auta a budete ji muset znovu zalat k ověření."}</div>
            case VehicleStatus.PENDING_VERIFICATION:
                return <div style={{color: "red"}}>{"Při uložení se zruší požadavek na verifikaci a budete muset vozidlo znovu zalat k ověření."}</div>
            case VehicleStatus.NOT_VERIFIED:
                return <div style={{color: "red"}}>{"Upravte vozidlo a pošlete znova na ověření."}</div>
            case VehicleStatus.DRAFT:
            case VehicleStatus.ARCHIVED:
                return null;
        }
    }

    const renderVerificationFeedback = () => {
        if (vehicle.verificationFeedback?.description) {
            return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
                <Text text={"Admin feedback"} fontSize={FontSize.M_24} fontWeight={FontWeight.SEMIBOLD} />
                <Text text={vehicle.verificationFeedback.description} fontSize={FontSize.BASE_14} />
            </LayoutFlexColumn>
        }
        return null;
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("vehicleEditHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            <div style={{backgroundColor: "aquamarine"}}>
                {vehicle.status.toString()}
            </div>
            {renderWarningTextDependOnStatus()}
            {renderVerificationFeedback()}
        </LayoutFlexColumn>
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
