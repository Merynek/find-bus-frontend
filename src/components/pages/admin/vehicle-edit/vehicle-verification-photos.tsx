import React, { useState } from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {FlexGap} from "@/src/enums/layout.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {ImageElement} from "@/src/components/components/image-element/image-element";
import {VehiclePhotoType} from "@/src/api/openapi";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Heading} from "@/src/components/components/texts/heading";
import FileGroupUploaderForm from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";
import {
    createEmptyPublicPhotoItem,
    createInitPublicPhotosState, IPublicPhotoItem,
    uploadPublicPhotos
} from "@/src/components/pages/vehicle-edit/vehicle-edit-utils.page";

interface IVehicleVerificationPhotosProps {
    vehicle: Vehicle;
}

const VehicleVerificationPhotos = (props: IVehicleVerificationPhotosProps) => {
    const {vehicle} = props;
    const { t: vehicleT } = useTranslate("page.vehicle");
    const { t } = useTranslate("page.adminVehicle");
    const [isUploading, setIsUploading] = useState(false);
    const [photos, setPhotos] = useState<IPublicPhotoItem[]>(createInitPublicPhotosState(vehicle));
    const [photoIdsToDelete, setPhotoIdsToDelete] = useState<number[]>([]);
    const locale = useCurrentLocale();

    const renderImage = (path: string) => {
        return <div style={{width: "200px", height: "200px", position: "relative"}}>
            <ImageElement
                src={path}
                alt={""}
                fill={true}
            />
        </div>
    }

    const renderVehiclePhotoType = (label: string, type: VehiclePhotoType) => {
        const _photos = vehicle.photos.filter(p => p.type === type);
        return <LayoutFlexColumn gap={FlexGap.TINY_8}>
            <Text text={label} fontWeight={FontWeight.SEMIBOLD} fontSize={FontSize.M_22} />
            <LayoutFlexRow gap={FlexGap.TINY_8}>
                {_photos.map(p => {
                    const _currentPhoto = photos.find(pp => pp.id === p.id.toString());
                    const _files = _currentPhoto ? [_currentPhoto] : [createEmptyPublicPhotoItem(p.id)];
                    return <div key={p.id}>
                        {p.image && <LayoutFlexRow gap={FlexGap.SMALL_16}>
                            {renderImage(p.image.path)}
                            <FileGroupUploaderForm
                                files={_files}
                                deleteIds={photoIdsToDelete}
                                label={label}
                                onChange={(items, deleteIds) => {
                                    const item = items[0];
                                    if (item) {
                                        item.id = p.id.toString();
                                        const cleanItems = photos.filter(_p => _p.id !== item.id);
                                        setPhotos([...cleanItems, {
                                            ...item,
                                            id: item.id,
                                            originalId: p.id
                                        }]);
                                        setPhotoIdsToDelete([...photoIdsToDelete, ...deleteIds]);
                                    } else {
                                        const cleanItems = photos.filter(_p => _p.id !== p.id.toString());
                                        setPhotos([...cleanItems]);
                                        setPhotoIdsToDelete([...photoIdsToDelete, ...deleteIds]);
                                    }
                                }}
                                onlyOneFile={true}
                            />
                        </LayoutFlexRow>}
                    </div>
                })}
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    const renderVehiclePhotos = () => {
        return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <Heading text={vehicleT("vehiclePhotos")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                {renderVehiclePhotoType(vehicleT("frontPhoto"), VehiclePhotoType.FRONT)}
                {renderVehiclePhotoType(vehicleT("rearPhoto"), VehiclePhotoType.REAR)}
                {renderVehiclePhotoType(vehicleT("leftSidePhoto"), VehiclePhotoType.LEFT_SIDE)}
                {renderVehiclePhotoType(vehicleT("rightSidePhoto"), VehiclePhotoType.RIGHT_SIDE)}
                {renderVehiclePhotoType(vehicleT("interiorPhoto"), VehiclePhotoType.INTERIOR)}
            </LayoutFlexColumn>
        </LayoutFlexColumn>
    }

    return <LayoutFlexColumn gap={FlexGap.LARGE_32}>
        <input type="hidden" name={FormDataEnum.vehicleId} value={vehicle.id}/>
        <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
        {renderVehiclePhotos()}
        <ButtonClick
            controlled={true}
            onClick={async () => {
                setIsUploading(true);
                await uploadPublicPhotos(photos, photoIdsToDelete, vehicle);
                setIsUploading(false);
            }}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
            isDisabled={isUploading}
            label={t("uploadPublicPhotos")}
        />
    </LayoutFlexColumn>
};

export default VehicleVerificationPhotos;
