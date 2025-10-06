import React from "react";
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

const VehiclePhotoGroup = (props: IVehiclePhotoGroupProps) => {
    const {vehicle, label, type} = props;

    const getPhotoPaths = (): (string|undefined)[] => {
        const photos = vehicle.photos.filter(p => p.type === type);
        return photos.map(p => p.file?.path);
    }

    const photos = getPhotoPaths();

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Text text={label} fontWeight={FontWeight.SEMIBOLD} fontSize={FontSize.M_22} />
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            {photos.map((p, i) => {
                return <ImageUploader
                    key={i}
                    label={""}
                    inputName={FormDataEnum.imagesUpload}
                    initialImage={p}
                />
            })}
        </LayoutFlexRow>
    </LayoutFlexColumn>
};

export default VehiclePhotoGroup;
