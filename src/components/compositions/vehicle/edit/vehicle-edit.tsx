import React, {useState} from "react";
import styles from "./vehicle-edit.module.scss";
import {observer} from "mobx-react";
import {TextBox} from "../../../components/inputs/text-box/text-box";
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {CheckBox} from "../../../components/inputs/check-box/check-box";
import {removeOnIndex} from "@/src/utils/common";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {FileUploadInput} from "../../../components/file-upload-input/file-upload-input";
import {getPhotosFromFiles} from "@/src/utils/file/file";
import {MediaElement} from "../../../components/media-element/media-element";
import {Photo} from "@/src/data/media/photo";
import {VehicleEditStore} from "./vehicle-edit.store";
import {ValidationTooltip} from "../../../components/validation-tooltip/validation-tooltip";
import {ValidationState} from "../../../components/inputs/inputEnum";
import {AppManager} from "@/src/singletons/app-manager";
import {DatePicker} from "../../../components/inputs/date-picker/date-picker";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {VehicleApi} from "@/src/api/vehicleApi";
import {Icon} from "../../../components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";
import {DropFileType} from "@/src/enums/file-drop-type.enum";
import {CheckBoxSize} from "@/src/enums/check-box.enum";
import {NumberBox} from "../../../components/inputs/number-box/number-box";
import {useBean} from "ironbean-react";
import {ConfirmDialog} from "../../modals/confirm-dialog/confirm-dialog";
import {PlaceAutocomplete} from "@/src/components/components/inputs/place-autocomplete/place-autocomplete";
import {runInAction} from "mobx";
import {PlaceManager} from "@/src/singletons/place-manager";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FontSize, Text} from "@/src/components/components/texts/text/text";

export interface IVehicleEditProps {
    store: VehicleEditStore;
    onClose: () => void;
}

enum VehiclePhotoType {
    FRONT = "FRONT",
    REAR = "REAR",
    LEFT_SIDE = "LEFT_SIDE",
    RIGHT_SIDE = "RIGHT_SIDE",
    INTERIOR_1 = "INTERIOR_1",
    INTERIOR_2 = "INTERIOR_2",
    TECHNICAL_CERTIFICATE_1 = "TECHNICAL_CERTIFICATE_1",
    TECHNICAL_CERTIFICATE_2 = "TECHNICAL_CERTIFICATE_2",
    INSURANCE = "INSURANCE"
}

export const VehicleEdit = observer((props: IVehicleEditProps) => {
    const {store, onClose} = props;
    const _vehiclesApi = useBean(VehicleApi);
    const _appManager = useBean(AppManager);
    const _configuration = useBean(AppConfiguration);
    const [ensureModalOpen, setEnsureModalOpen] = useState(false);
    const _placeManager = useBean(PlaceManager);

    const _handleAddMedia = async (files: File[], type: VehiclePhotoType) => {
        const photos = await getPhotosFromFiles(files);
        switch (type) {
            case VehiclePhotoType.FRONT:
                store.frontPhoto = photos[0];
                break;
            case VehiclePhotoType.REAR:
                store.rearPhoto = photos[0];
                break;
            case VehiclePhotoType.LEFT_SIDE:
                store.leftSidePhoto = photos[0];
                break;
            case VehiclePhotoType.RIGHT_SIDE:
                store.rightSidePhoto = photos[0];
                break;
            case VehiclePhotoType.INTERIOR_1:
                store.interierPhoto1 = photos[0];
                break;
            case VehiclePhotoType.INTERIOR_2:
                store.interierPhoto2 = photos[0];
                break;
            case VehiclePhotoType.TECHNICAL_CERTIFICATE_1:
                store.technicalCertificate1 = photos[0];
                break;
            case VehiclePhotoType.TECHNICAL_CERTIFICATE_2:
                store.technicalCertificate2 = photos[0];
                break;
            case VehiclePhotoType.INSURANCE:
                store.insurancePhoto = photos[0];
                break;
        }
    }

    const _renderPhotoData = (type: VehiclePhotoType): {label: string, photo: Photo|null} => {
        switch (type) {
            case VehiclePhotoType.FRONT:
                return {
                    label: "FRONT",
                    photo: store.frontPhoto
                }
            case VehiclePhotoType.REAR:
                return {
                    label: "REAR",
                    photo: store.rearPhoto
                }
            case VehiclePhotoType.LEFT_SIDE:
                return {
                    label: "LEFT_SIDE",
                    photo: store.leftSidePhoto
                }
            case VehiclePhotoType.RIGHT_SIDE:
                return {
                    label: "RIGHT_SIDE",
                    photo: store.rightSidePhoto
                }
            case VehiclePhotoType.INTERIOR_1:
                return {
                    label: "INTERIOR_1",
                    photo: store.interierPhoto1
                }
            case VehiclePhotoType.INTERIOR_2:
                return {
                    label: "INTERIOR_2",
                    photo: store.interierPhoto2
                }
            case VehiclePhotoType.TECHNICAL_CERTIFICATE_1:
                return {
                    label: "TECHNICAL_CERTIFICATE_1",
                    photo: store.technicalCertificate1
                }
            case VehiclePhotoType.TECHNICAL_CERTIFICATE_2:
                return {
                    label: "TECHNICAL_CERTIFICATE_2",
                    photo: store.technicalCertificate2
                }
            case VehiclePhotoType.INSURANCE:
                return {
                    label: "INSURANCE",
                    photo: store.insurancePhoto
                }
        }
    }

    const _renderPhoto = (type: VehiclePhotoType) => {
        const data = _renderPhotoData(type);
        return <div className={styles.line}>
            <span>{data.label} :</span>
            {data.photo && <div className={styles.photo}>
                <MediaElement
                    key={data.photo.id}
                    mediaItem={data.photo}
                />
            </div>}
            <FileUploadInput
                type={[DropFileType.IMAGE]}
                onDrop={async (files) => {
                    await _handleAddMedia(files, type);
                }}
                opener={<div>
                    <Icon
                        icon={IconType.ADD}
                    />
                    <span>SELECT FILE</span>
                </div>}
            />
        </div>
    }

    const submit = async () => {
        _appManager.loading = true;
        if (store.id) {
            await _vehiclesApi.updateVehicle({
                vehicle: store
            })
            await _vehiclesApi.updateVehiclePhotos({
                vehicle: store
            })
        } else {
            const id = await _vehiclesApi.addVehicle({
                vehicle: store
            })
            await _vehiclesApi.addVehiclePhotos({
                idVehicle: id,
                vehicle: store
            })
        }
        _appManager.loading = false;
        onClose();
    }

    const ensureDialog = () => {
        return <ConfirmDialog
            open={ensureModalOpen}
            title={"Update data cancel verification of this vehicle!"}
            message={"Are you sure?"}
            submitButtonText={"Submit"}
            cancelButtonText={"Cancel"}
            onChange={async () => {
                await submit();
                setEnsureModalOpen(false);
            }}
            onClose={() => {
                setEnsureModalOpen(false);
            }}
        />
    }

    return <div className={styles.layout}>
        <div className={styles.line}>
            <span>Name:</span>
            <ValidationTooltip state={ValidationState.ERROR} open={!store.nameIsValid} message={"Chyba"} placement={'right'}>
                <div>
                    <TextBox value={store.name} onChange={(val) => store.name = val} />
                </div>
            </ValidationTooltip>
        </div>
        <div className={styles.line}>
            <span>Registration Sign:</span>
            <ValidationTooltip state={ValidationState.ERROR} open={!store.registrationSignIsValid} message={"Chyba"} placement={'right'}>
                <div>
                    <TextBox value={store.registrationSign} onChange={(val) => store.registrationSign = val} />
                </div>
            </ValidationTooltip>
        </div>
        <div className={styles.line}>
            <span>VIN:</span>
            <ValidationTooltip state={ValidationState.ERROR} open={!store.vinIsValid} message={"Chyba"} placement={'right'}>
                <div>
                    <TextBox value={store.VIN} onChange={(val) => store.VIN = val} />
                </div>
            </ValidationTooltip>
        </div>
        <div className={styles.line}>
            <span>STK Expired:</span>
            <ValidationTooltip state={ValidationState.ERROR} open={!store.stkExpiredIsValid} message={"Chyba"} placement={'right'}>
                <div>
                    <DatePicker
                        selected={store.stkExpired}
                        onChange={(val) => {
                            if (val) {
                                store.stkExpired = val;
                            }
                        }}
                        placeholderText={"Expired"}
                    />
                </div>
            </ValidationTooltip>
        </div>
        <div className={styles.line}>
            <span>Year Of Manufacture:</span>
            <ValidationTooltip state={ValidationState.ERROR} open={!store.yearOfManufactureIsValid} message={"Chyba"} placement={'right'}>
                <div>
                    <NumberBox value={store.yearOfManufacture} onChange={(val) => {
                        if (val) {
                            store.yearOfManufacture = val;
                        }
                    }} />
                </div>
            </ValidationTooltip>
        </div>
        <div className={styles.line}>
            <span>Capacity:</span>
            <ValidationTooltip state={ValidationState.ERROR} open={!store.personsCapacityIsValid} message={"Chyba"} placement={'right'}>
                <div>
                    <NumberBox value={store.personsCapacity} onChange={(val) => {
                        if (val) {
                            store.personsCapacity = val
                        }
                    }} />
                </div>
            </ValidationTooltip>
        </div>
        <div className={styles.line}>
            <span>Počet handikepovaných:</span>
            <NumberBox value={store.handicappedUserCount} onChange={(val) => {
                if (val) {
                    store.handicappedUserCount = val
                }
            }} />
        </div>
        <div className={styles.line}>
            <span>Euro:</span>
            {Object.values(EuroStandard).map((euro, index) => {
                return <CheckBox
                    key={index}
                    label={euro}
                    value={store.euro === euro}
                    onChange={(val) => {
                        store.euro = euro;
                    }}
                    size={CheckBoxSize.MEDIUM}
                />
            })}
        </div>
        <div className={styles.line}>
            <span>Amenities:</span>
            {Object.values(Amenities).map((amenity, index) => {
                return <CheckBox
                    key={index}
                    label={amenity}
                    value={store.amenities.indexOf(amenity) > -1}
                    onChange={(val) => {
                        if (val) {
                            store.amenities.push(amenity);
                        } else {
                            const index = store.amenities.indexOf(amenity);
                            removeOnIndex(store.amenities, index);
                        }
                    }}
                    size={CheckBoxSize.MEDIUM}
                />
            })}
        </div>
        <ValidationTooltip
            state={ValidationState.ERROR}
            open={!store.frontPhotoIsValid || !store.rearPhotoIsValid || !store.leftSidePhotoIsValid ||
                !store.rightSidePhotoIsValid || !store.interierPhoto1IsValid || !store.interierPhoto2IsValid ||
                !store.technicalCertificatePhoto1IsValid || !store.insurancePhotoIsValid
            }
            placement={'right'}
            message={"Photo are required"}>
            <div>
                {_renderPhoto(VehiclePhotoType.FRONT)}
                {_renderPhoto(VehiclePhotoType.REAR)}
                {_renderPhoto(VehiclePhotoType.LEFT_SIDE)}
                {_renderPhoto(VehiclePhotoType.RIGHT_SIDE)}
                {_renderPhoto(VehiclePhotoType.INTERIOR_1)}
                {_renderPhoto(VehiclePhotoType.INTERIOR_2)}
                {_renderPhoto(VehiclePhotoType.TECHNICAL_CERTIFICATE_1)}
                {_renderPhoto(VehiclePhotoType.TECHNICAL_CERTIFICATE_2)}
                {_renderPhoto(VehiclePhotoType.INSURANCE)}
            </div>
        </ValidationTooltip>
        <LayoutFlexRow>
            <Text text={"Departure"} fontSize={FontSize.BASE_14} />
            <PlaceAutocomplete
                place={store.departureStation || undefined}
                onChange={(place) => {
                    runInAction(() => {
                        if (place) {
                            store.departureStation = _placeManager.add(place);
                        }
                    })
                }}
            />
        </LayoutFlexRow>
        <ButtonClick
            onClick={async () => {
                store.validate();
                if (store.isValid) {
                    if (store.isVerifiedForTransporting) {
                        setEnsureModalOpen(true)
                    } else {
                        await submit();
                    }
                }
            }}
            isDisabled={!store.isValid}
            label={"SAVE"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <ButtonClick
            onClick={onClose}
            label={""}
            type={ButtonType.YELLOW}
            size={ButtonSize.BY_CONTENT}
        >
            <Icon icon={IconType.CLOSE} />
        </ButtonClick>
        {ensureDialog()}
    </div>
});