import React from "react";
import styles from "./vehicle-detail-list.module.scss";
import {ImageElement} from "../../../components/image-element/image-element";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import {LayoutFlexColumn} from "../../../components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {Vehicle} from "@/src/data/vehicle/vehicle";

export interface IVehicleDetailListProps {
    vehicle: Vehicle;
}

export const VehicleDetail = (props: IVehicleDetailListProps) => {
    const {vehicle} = props;

    const renderImage = (path: string) => {
        return <div style={{width: "200px", height: "200px", position: "relative"}}>
            <ImageElement
                src={path}
                alt={""}
                fill={true}
            />
        </div>
    }

    return <div className={styles.layout}>
        <LayoutFlexColumn>
            <LayoutFlexColumn>
                <div style={{backgroundColor: "aquamarine"}}>
                    {vehicle.status.toString()}
                </div>
                <div className={styles.line}>
                    <span>Status:</span>
                    <span>{vehicle.status}</span>
                </div>
                <div className={styles.line}>
                    <span>Name:</span>
                    <span>{vehicle.name}</span>
                </div>
                {vehicle.departureStation && <div className={styles.line}>
                    <span>Departure place:</span>
                    <span>{vehicle.departureStation.placeFormatted || vehicle.departureStation.name || ""}</span>
                </div>}
                <div className={styles.line}>
                    <span>Capacity:</span>
                    <span>{vehicle.personsCapacity}</span>
                </div>
                {vehicle.handicappedUserCount > 0 && <div className={styles.line}>
                    <span>Počet handikepovaných:</span>
                    <span>{vehicle.handicappedUserCount}</span>
                </div>}
                <div className={styles.line}>
                    <span>Euro:</span>
                    <span>{vehicle.euro.toString()}</span>
                </div>
                <div className={styles.line}>
                    <span>Amenities:</span>
                    <span>{vehicle.amenities.map((amenity, index) => {
                        return <span key={index}>{amenity.toString()}</span>;
                    })}</span>
                </div>
            </LayoutFlexColumn>
            <LayoutFlexRow canWrap={true} gap={FlexGap.SMALL_16}>
                {vehicle.photos.map(photo => {
                    return <div key={photo.id}>
                        <span>{photo.type}:</span>
                        {photo.image?.path && renderImage(photo.image.path)}
                    </div>
                })}
                {vehicle.documents.map(document => {
                    return <div key={document.id}>
                        <span>{document.type}:</span>
                        {document.image?.path && renderImage(document.image.path)}
                    </div>
                })}
            </LayoutFlexRow>
        </LayoutFlexColumn>
    </div>
};