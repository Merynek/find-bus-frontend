import React, {useCallback, useState } from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehiclePhotoType} from "@/src/api/openapi";
import {FlexGap} from "@/src/enums/layout.enum";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {isClient} from "@/src/utils/common";

interface IVehiclePhotoGroupProps {
    vehicle: Vehicle;
    label: string;
    type: VehiclePhotoType;
}

interface ActiveSlot {
    key: string;
    photoId: number | undefined;
    initialPath: string | null;
    newFile: File | null;
}

const VehiclePhotoGroup = (props: IVehiclePhotoGroupProps) => {
    const { vehicle, label, type } = props;

    const [deletedPhotoIds, setDeletedPhotoIds] = useState<number[]>([]);
    const [newSlotCounter, setNewSlotCounter] = useState(0);

    const [activeSlots, setActiveSlots] = useState<ActiveSlot[]>(() => {
        return vehicle.photos
            .filter(p => p.type === type)
            .map(p => ({
                key: `photo-${p.id}`,
                photoId: p.id,
                initialPath: p.file?.path || null,
                newFile: null,
            }));
    });

    const handleDeletePhoto = useCallback((photoId?: number) => {
        if (photoId) {
            setDeletedPhotoIds(prevIds => [...prevIds, photoId]);
        }
    }, []);

    const handleFileReplace = useCallback((slotKey: string, file: File, photoId?: number) => {
        setActiveSlots(prevSlots => {
            const slotIndex = prevSlots.findIndex(s => s.key === slotKey);

            if (slotIndex !== -1) {
                const updatedSlots = [...prevSlots];
                if (photoId) {
                    handleDeletePhoto(photoId);
                }
                updatedSlots[slotIndex] = {
                    ...updatedSlots[slotIndex],
                    newFile: file,
                };
                return updatedSlots;
            }
            return prevSlots;
        });

    }, [handleDeletePhoto]);


    const handleFileSelectForEmptySlot = useCallback((file: File | null) => {
        if (file) {
            const newKey = `new-${type}-${newSlotCounter}`;
            setNewSlotCounter(prev => prev + 1);

            const newSlot: ActiveSlot = {
                key: newKey,
                photoId: undefined,
                initialPath: null,
                newFile: file,
            };

            setActiveSlots(prevSlots => [...prevSlots, newSlot]);
        }
    }, [newSlotCounter, type]);

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Text text={label} fontWeight={FontWeight.SEMIBOLD} fontSize={FontSize.M_22} />
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            {activeSlots.map((slot) => {
                const isExisting = slot.photoId !== undefined;
                const photoId = slot.photoId;

                let previewUrl: string | null = null;
                if (slot.newFile && isClient()) {
                    previewUrl = URL.createObjectURL(slot.newFile);
                } else if (isExisting) {
                    previewUrl = slot.initialPath;
                }

                if (!previewUrl) return null;

                const shouldSendType = !!slot.newFile;
                return (
                    <div key={slot.key}>
                        <ImageUploader
                            inputName={FormDataEnum.imagesUpload}
                            previewUrl={previewUrl}
                            onDelete={() => {
                                setActiveSlots(prevSlots => prevSlots.filter(s => s.key !== slot.key));
                                handleDeletePhoto(photoId);
                            }}
                            isExistingPhoto={isExisting && slot.newFile === null}
                            onFileSelect={(file) => {
                                if (file) {
                                    handleFileReplace(slot.key, file, photoId);
                                }
                            }}
                            imageId={slot.key}
                        />
                        {shouldSendType && (
                            <input
                                type="hidden"
                                name={FormDataEnum.imagesType}
                                value={type}
                            />
                        )}
                    </div>
                );
            })}
            <div key="empty-slot">
                <ImageUploader
                    inputName={FormDataEnum.imagesUpload}
                    previewUrl={null}
                    onDelete={() => { }}
                    isExistingPhoto={false}
                    onFileSelect={handleFileSelectForEmptySlot}
                    imageId={`empty-uploader-${type}`}
                />
            </div>
            {deletedPhotoIds.map(id => (
                <input
                    key={`deleted-${id}`}
                    type="hidden"
                    name={FormDataEnum.photoIdsToDelete}
                    value={id}
                />
            ))}
        </LayoutFlexRow>
    </LayoutFlexColumn>
};

export default VehiclePhotoGroup;
