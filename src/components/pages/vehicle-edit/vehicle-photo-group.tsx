import React, {useState } from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehiclePhotoType} from "@/src/api/openapi";
import {FlexGap} from "@/src/enums/layout.enum";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {FormDataEnum} from "@/src/enums/form-data.enum";

interface IVehiclePhotoGroupProps {
    vehicle: Vehicle;
    label: string;
    type: VehiclePhotoType;
}

interface IPhotoItem {
    id: string;
    dbId?: number;
    path?: string;
    file?: File;
}

const VehiclePhotoGroup = (props: IVehiclePhotoGroupProps) => {
    const { vehicle, label, type } = props;

    const generateId = () => {
        return new Date().getTime().toString() + Math.random().toString();
    }

    const [items, setItems] = useState<IPhotoItem[]>(() => {
        const photos: IPhotoItem[] = vehicle.photos
            .filter(p => p.type === type)
            .map(p => ({
                id: p.id.toString(),
                dbId: p.id,
                path: p.file?.path,
                file: undefined,
            }));
        photos.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined
        });
        return photos;
    });

    const addItemOnIndex = (currentItems: IPhotoItem[], index: number, file: File) => {
        currentItems.splice(index, 0, {
            file: file,
            dbId: undefined,
            path: URL.createObjectURL(file),
            id: generateId()
        });
        setItems(currentItems);
    }

    const [deletedPhotoIds, setDeletedPhotoIds] = useState<number[]>([]);
    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Text text={label} fontWeight={FontWeight.SEMIBOLD} fontSize={FontSize.M_22} />
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            {items.map((item, index) => {
                const itemForUpload = item.dbId === undefined && item.path !== undefined;

                return <React.Fragment key={index}>
                    <ImageUploader
                        inputName={FormDataEnum.imagesUpload}
                        previewUrl={item.path || undefined}
                        onDelete={() => {
                            if (item.dbId) {
                                setDeletedPhotoIds([...deletedPhotoIds, item.dbId]);
                                setItems(prevItems => prevItems.filter(i => i.dbId !== item.dbId));
                            } else {
                                setItems(prevItems => prevItems.filter(i => i.file !== item.file));
                            }
                        }}
                        isExistingPhoto={item.dbId !== undefined}
                        onFileSelect={(file) => {
                            if (item.dbId) {
                                setDeletedPhotoIds([...deletedPhotoIds, item.dbId]);
                                const newItems = items.filter(i => i.dbId !== item.dbId);
                                addItemOnIndex(newItems, index, file);
                            } else {
                                const newItems = [...items];
                                addItemOnIndex(newItems, index, file);
                            }
                        }}
                        imageId={item.id}
                    />
                    {itemForUpload && <input
                        type="hidden"
                        name={FormDataEnum.imagesType}
                        value={type}
                    />}
                </React.Fragment>
            })}
            {deletedPhotoIds.map(id => (
                <input
                    key={id}
                    type="hidden"
                    name={FormDataEnum.photoIdsToDelete}
                    value={id}
                />
            ))}
        </LayoutFlexRow>
    </LayoutFlexColumn>
};

export default VehiclePhotoGroup;
