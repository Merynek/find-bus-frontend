import React, {useState} from "react";
import styles from "./vehicle-edit.module.scss";
import {observer} from "mobx-react";
import {TextBox} from "../../../components/inputs/text-box/text-box";
import {Amenities, Country, EuroStandard} from "@/src/api/openapi";
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
import {DatePicker} from "../../../components/inputs/date-picker/date-picker";
import {Icon} from "../../../components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";
import {DropFileType} from "@/src/enums/file-drop-type.enum";
import {CheckBoxSize} from "@/src/enums/check-box.enum";
import {NumberBox} from "../../../components/inputs/number-box/number-box";
import {ConfirmDialog} from "../../modals/confirm-dialog/confirm-dialog";
import {PlaceAutocomplete} from "@/src/components/components/inputs/place-autocomplete/place-autocomplete";
import {runInAction} from "mobx";
import {PlaceManager} from "@/src/singletons/place-manager";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FontSize, Text} from "@/src/components/components/texts/text/text";
import {useApp} from "@/src/app/contexts/AppContext";
import {addVehicleFormAction} from "@/src/app/actions/forms/vehicle/add/addVehicleFormAction";
import {editVehicleFormAction} from "@/src/app/actions/forms/vehicle/edit/editVehicleFormAction";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";

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
    const {showLoader, hideLoader} = useApp();
    const _placeManager = PlaceManager.instance;
    const [ensureModalOpen, setEnsureModalOpen] = useState(false);

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
        showLoader();
        let response: any; // Pro uložení odpovědi z akce

        const formData = new FormData();
        formData.append('name', store.name);
        formData.append('registrationSign', store.registrationSign);
        formData.append('vin', store.VIN);
        formData.append('stkExpired', store.stkExpired?.toISOString() || '');
        formData.append('yearOfManufacture', store.yearOfManufacture?.toString() || '');
        formData.append('personsCapacity', store.personsCapacity?.toString() || '');
        formData.append('handicappedUserCount', store.handicappedUserCount?.toString() || '');
        formData.append('euro', store.euro || '');

        store.amenities.forEach(amenity => {
            formData.append('amenities', amenity);
        });

        // Append departureStation data
        // Jelikož je departureStation v VehicleCoreSchema optional(), nemusíme striktně kontrolovat
        if (store.departureStation) {
            // Zde můžete přidat další kontrolu, pokud jsou PlaceRequestDto pole optional
            // Váš stávající kód to řeší prázdnými stringy, což je OK, pokud to API akceptuje
            formData.append('departureStation.placeId', store.departureStation.placeId || "");
            formData.append('departureStation.point.lat', store.departureStation.point?.lat.toString() || "");
            formData.append('departureStation.point.lng', store.departureStation.point?.lng.toString() || "");
            formData.append('departureStation.country', store.departureStation?.country || Country.CZ);
            formData.append('departureStation.name', store.departureStation.name || "");
            formData.append('departureStation.placeFormatted', store.departureStation.placeFormatted || "");
        }


        if (store.id) {
            formData.append('vehicleId', store.id.toString()); // Klíčové: Předáme ID vozidla!

            if (store.frontPhoto && store.frontPhoto.file) formData.append('frontPhoto', store.frontPhoto.file);
            if (store.rearPhoto && store.rearPhoto.file) formData.append('rearPhoto', store.rearPhoto.file);
            if (store.leftSidePhoto && store.leftSidePhoto.file) formData.append('leftSidePhoto', store.leftSidePhoto.file);
            if (store.rightSidePhoto && store.rightSidePhoto.file) formData.append('rightSidePhoto', store.rightSidePhoto.file);
            if (store.interierPhoto1 && store.interierPhoto1.file) formData.append('interierPhoto1', store.interierPhoto1.file);
            if (store.interierPhoto2 && store.interierPhoto2.file) formData.append('interierPhoto2', store.interierPhoto2.file);
            if (store.technicalCertificate1 && store.technicalCertificate1.file) formData.append('technicalCertificate1', store.technicalCertificate1.file);
            if (store.technicalCertificate2 && store.technicalCertificate2.file) formData.append('technicalCertificate2', store.technicalCertificate2.file);
            if (store.insurancePhoto && store.insurancePhoto.file) formData.append('insurance', store.insurancePhoto.file);

            response = await editVehicleFormAction(undefined, formData);

        } else {
            if (store.frontPhoto && store.frontPhoto.file) formData.append('frontPhoto', store.frontPhoto.file);
            if (store.rearPhoto && store.rearPhoto.file) formData.append('rearPhoto', store.rearPhoto.file);
            if (store.leftSidePhoto && store.leftSidePhoto.file) formData.append('leftSidePhoto', store.leftSidePhoto.file);
            if (store.rightSidePhoto && store.rightSidePhoto.file) formData.append('rightSidePhoto', store.rightSidePhoto.file);
            if (store.interierPhoto1 && store.interierPhoto1.file) formData.append('interierPhoto1', store.interierPhoto1.file);
            if (store.interierPhoto2 && store.interierPhoto2.file) formData.append('interierPhoto2', store.interierPhoto2.file);
            if (store.technicalCertificate1 && store.technicalCertificate1.file) formData.append('technicalCertificate1', store.technicalCertificate1.file);
            if (store.technicalCertificate2 && store.technicalCertificate2.file) formData.append('technicalCertificate2', store.technicalCertificate2.file);
            if (store.insurancePhoto && store.insurancePhoto.file) formData.append('insurance', store.insurancePhoto.file);

            response = await addVehicleFormAction(undefined, formData);
        }

        if (response?.errors) {
            // Handle validation errors from the server action
            console.error("Server-side validation errors:", response.errors);
            // You might want to update your MobX store with these errors
            // For example: store.setErrors(response.errors);
        } else if (response?.error) {
            // Handle generic error message from the server action
            console.error("Server-side error:", response.error);
        } else {
            // Úspěch:
            onClose(); // Zavřít formulář, pokud je vše v pořádku
        }
        hideLoader();
    };

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
                        locale={AppConfiguration.instance.locale}
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