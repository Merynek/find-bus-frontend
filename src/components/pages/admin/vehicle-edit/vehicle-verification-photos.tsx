import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FlexGap} from "@/src/enums/layout.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {FormActionEnum} from "@/src/enums/form-action.enum";
import {adminVehicleFormAction} from "@/src/server-actions/forms/admin/vehicle/adminVehicleFormAction";
import {ImageElement} from "@/src/components/components/image-element/image-element";
import {VehiclePhotoType} from "@/src/api/openapi";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import FileGroupUploaderForm
    from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";
import {Heading} from "@/src/components/components/texts/heading";

interface IVehicleVerificationPhotosProps {
    vehicle: Vehicle;
}

const VehicleVerificationPhotos = (props: IVehicleVerificationPhotosProps) => {
    const {vehicle} = props;
    const { t: vehicleT } = useTranslate("page.vehicle");
    const { t } = useTranslate("page.adminVehicle");
    const [state, action, pending] = useFormActionState(adminVehicleFormAction, {
        data: {
            vehicleId: vehicle.id
        }
    });
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
                    const _files = p.publicFile ? [{id: p.id, file: p.publicFile}] : [];
                    return <div key={p.id}>
                        {p.file && <LayoutFlexRow gap={FlexGap.SMALL_16}>
                            {renderImage(p.file.path)}
                            <FileGroupUploaderForm
                                files={_files}
                                label={"Public version"}
                                idValue={p.id.toString()}
                                formFileUpload={FormDataEnum.imagesUpload}
                                formFileType={FormDataEnum.photoIds}
                                formIdsToDelete={FormDataEnum.photoIdsToDelete}
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

    return <form action={action}>
        <LayoutFlexColumn gap={FlexGap.LARGE_32}>
            <FormStatus state={state}/>
            <input type="hidden" name={FormDataEnum.vehicleId} value={vehicle.id}/>
            <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
            {renderVehiclePhotos()}
            <ButtonClick
                controlled={false}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
                name={FormDataEnum.formActionType}
                value={FormActionEnum.SAVE}
                isDisabled={pending}
                label={t("uploadPublicPhotos")}
            />
        </LayoutFlexColumn>
    </form>
};

export default VehicleVerificationPhotos;
