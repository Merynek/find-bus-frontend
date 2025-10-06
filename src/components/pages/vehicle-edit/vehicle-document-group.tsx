import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehicleDocumentType} from "@/src/api/openapi";
import {FlexGap} from "@/src/enums/layout.enum";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {FormDataEnum} from "@/src/enums/form-data.enum";

interface IVehicleDocumentGroupProps {
    vehicle: Vehicle;
    label: string;
    type: VehicleDocumentType;
}

const VehicleDocumentGroup = (props: IVehicleDocumentGroupProps) => {
    const {vehicle, label, type} = props;

    const getDocumentPaths = (): (string|undefined)[] => {
        const photos = vehicle.documents.filter(p => p.type === type);
        return photos.map(p => p.file?.path);
    }

    const documents = getDocumentPaths();

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Text text={label} fontWeight={FontWeight.SEMIBOLD} fontSize={FontSize.M_22} />
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            {documents.map((p, i) => {
                return <ImageUploader
                    key={i}
                    label={""}
                    inputName={FormDataEnum.documentsUpload}
                    initialImage={p}
                />
            })}
        </LayoutFlexRow>
    </LayoutFlexColumn>
};

export default VehicleDocumentGroup;
