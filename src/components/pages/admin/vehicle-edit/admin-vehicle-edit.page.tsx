"use client";

import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {VehiclePhotoType, VehicleResponseDto} from "@/src/api/openapi";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {Heading} from "@/src/components/components/texts/heading";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";
import {FormActionEnum} from "@/src/enums/form-action.enum";
import FileGroupUploaderForm
    from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";
import {adminVehicleFormAction} from "@/src/server-actions/forms/admin/vehicle/adminVehicleFormAction";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Text} from "@/src/components/components/texts/text";
import {ImageElement} from "@/src/components/components/image-element/image-element";
import {VehicleDetail} from "@/src/components/compositions/vehicle/detail-list/vehicle-detail-list";

interface IAdminVehicleEditPageProps {
    vehicle: VehicleResponseDto;
}

const AdminVehicleEditPage = (props: IAdminVehicleEditPageProps) => {
    const id = props.vehicle.id;
    const vehicle = VehicleConverter.toInstance(props.vehicle);
    const { t: vehicleT } = useTranslate("page.vehicle");
    const { t } = useTranslate("page.adminVehicle");
    const [state, action, pending] = useFormActionState(adminVehicleFormAction, {
        data: {
            vehicleId: id
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
                    return <div key={p.id}>
                        {p.file && renderImage(p.file.path)}
                    </div>
                })}
            </LayoutFlexRow>
            <FileGroupUploaderForm
                files={[]}
                label={"Public version"}
                typeValue={type}
                formFileUpload={FormDataEnum.imagesUpload}
                formFileType={FormDataEnum.imagesType}
            />
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

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("vehicleHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <VehicleDetail vehicle={vehicle} />
        <form action={action}>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state}/>
                <input type="hidden" name={FormDataEnum.vehicleId} value={id}/>
                <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
                {renderVehiclePhotos()}
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    name={FormDataEnum.formActionType}
                    value={FormActionEnum.SAVE}
                    isDisabled={pending}
                    label={t("verified")}
                />
            </LayoutFlexColumn>
        </form>
    </LayoutFlexColumn>
};

export default AdminVehicleEditPage;
