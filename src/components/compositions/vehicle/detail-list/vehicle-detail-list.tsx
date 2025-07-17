import React from "react";
import styles from "./vehicle-detail-list.module.scss";
import {Vehicle} from "@/src/data/users/vehicle";
import {MediaElement} from "../../../components/media-element/media-element";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import {LayoutFlexColumn} from "../../../components/layout/layout-flex-column/layout-flex-column";

export interface IVehicleDetailListProps {
    vehicle: Vehicle;
}

export const VehicleDetail = (props: IVehicleDetailListProps) => {
    const {vehicle} = props;

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
            <LayoutFlexRow>
                {vehicle.frontPhoto && <div>
                    <span>Front Photo:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.frontPhoto}
                        />
                    </div>
                </div>}
                {vehicle.rearPhoto && <div>
                    <span>Rear Photo:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.rearPhoto}
                        />
                    </div>
                </div>}
                {vehicle.leftSidePhoto && <div>
                    <span>Left Photo:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.leftSidePhoto}
                        />
                    </div>
                </div>}
                {vehicle.rightSidePhoto && <div>
                    <span>Right Photo:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.rightSidePhoto}
                        />
                    </div>
                </div>}
                {vehicle.interierPhoto1 && <div>
                    <span>Interior Photo 1:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.interierPhoto1}
                        />
                    </div>
                </div>}
                {vehicle.interierPhoto2 && <div>
                    <span>Interior Photo 2:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.interierPhoto2}
                        />
                    </div>
                </div>}
                {vehicle.technicalCertificate1 && <div>
                    <span>Technical Certificate 1:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.technicalCertificate1}
                        />
                    </div>
                </div>}
                {vehicle.technicalCertificate2 && <div>
                    <span>Technical Certificate 2:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.technicalCertificate2}
                        />
                    </div>
                </div>}
                {vehicle.insurancePhoto && <div>
                    <span>Insurance:</span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={vehicle.insurancePhoto}
                        />
                    </div>
                </div>}
            </LayoutFlexRow>
        </LayoutFlexColumn>
    </div>
};