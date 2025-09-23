import React from "react";
import styles from "./vehicle-detail-list.module.scss";
import {Vehicle} from "@/src/data/users/vehicle";
import {ImageElement} from "../../../components/image-element/image-element";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import {LayoutFlexColumn} from "../../../components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";

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
                <div className={styles.line}>
                    <span>Is Verified:</span>
                    <span>{vehicle.isVerifiedForTransporting.toString()}</span>
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
                {vehicle.frontPhoto && <div>
                    <span>Front Photo:</span>
                    {renderImage(vehicle.frontPhoto.path)}
                </div>}
                {vehicle.rearPhoto && <div>
                    <span>Rear Photo:</span>
                    {renderImage(vehicle.rearPhoto.path)}
                </div>}
                {vehicle.leftSidePhoto && <div>
                    <span>Left Photo:</span>
                    {renderImage(vehicle.leftSidePhoto.path)}
                </div>}
                {vehicle.rightSidePhoto && <div>
                    <span>Right Photo:</span>
                    {renderImage(vehicle.rightSidePhoto.path)}
                </div>}
                {vehicle.interierPhoto1 && <div>
                    <span>Interior Photo 1:</span>
                    {renderImage(vehicle.interierPhoto1.path)}
                </div>}
                {vehicle.interierPhoto2 && <div>
                    <span>Interior Photo 2:</span>
                    {renderImage(vehicle.interierPhoto2.path)}
                </div>}
                {vehicle.technicalCertificate1 && <div>
                    <span>Technical Certificate 1:</span>
                    {renderImage(vehicle.technicalCertificate1.path)}
                </div>}
                {vehicle.technicalCertificate2 && <div>
                    <span>Technical Certificate 2:</span>
                    {renderImage(vehicle.technicalCertificate2.path)}
                </div>}
                {vehicle.insurancePhoto && <div>
                    <span>Insurance:</span>
                    {renderImage(vehicle.insurancePhoto.path)}
                </div>}
            </LayoutFlexRow>
        </LayoutFlexColumn>
    </div>
};