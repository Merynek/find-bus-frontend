import {observer} from "mobx-react";
import React, {useState} from "react";
import styles from "./trip-offer.module.scss";
import {Offer} from "@/src/data/offer";
import {Vehicle} from "@/src/data/users/vehicle";
import {formatDateTime} from "@/src/utils/date-time.format";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {useBean} from "ironbean-react";
import {VehicleDetailModal} from "../../vehicle/modal-vehicle-detail/vehicle-detail-modal";
import {LayoutFlexColumn} from "../../../components/layout/layout-flex-column/layout-flex-column";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {AppManager} from "@/src/singletons/app-manager";
import {FinancialDocument} from "@/src/data/documents/financialDocument";
import {
    FinancialDocumentDetail
} from "@/src/components/compositions/invoices/financial-document/financial-document-detail";
import {VehicleService} from "@/src/services/VehicleService";

export interface ITripOfferProps {
    offer: Offer;
}

export const TripOffer = observer((props: ITripOfferProps) => {
    const {offer} = props;
    const _configuration = useBean(AppConfiguration);
    const _appManager = useBean(AppManager);
    const [vehicleDetail, setVehicleDetail] = useState<Vehicle|null>(null);

    const renderVehicleModal = () => {
        return vehicleDetail && <VehicleDetailModal
            open={Boolean(vehicleDetail)}
            vehicle={vehicleDetail}
            onClose={() => {
                setVehicleDetail(null);
            }}
        />
    }

    const _renderVehicle = (vehicle: Vehicle) => {
        return <LayoutFlexColumn>
            <div className={styles.line}>
                <LayoutFlexRow>
                    <span>Name: </span>
                    <div>{vehicle.name}</div>
                </LayoutFlexRow>
            </div>
            <ButtonClick
                onClick={async () => {
                    _appManager.loading = true;
                    const detailVehicle = await VehicleService.getVehicle(vehicle.id)
                    _appManager.loading = false;
                    setVehicleDetail(detailVehicle);
                }}
                label={"Vehicle Detail"}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </LayoutFlexColumn>
    }

    const _renderDocument = (document: FinancialDocument) => {
        return <FinancialDocumentDetail document={document} key={document.id} />
    }

    return <div className={styles.layout}>
        {renderVehicleModal()}
        <div className={styles.line}>
            <span>User: </span>
            <div>{offer.user.id}</div>
        </div>
        <div className={styles.line}>
            <span>Price: </span>
            <div>{offer.price.amount} ,-</div>
        </div>
        <div className={styles.line}>
            <span>End Offer: </span>
            <div>{formatDateTime({
                date: offer.endOfferDate,
                locale: _configuration.locale
            })}</div>
        </div>
        <div className={styles.line}>
            <span>Vehicle: </span>
            <div>{_renderVehicle(offer.vehicle)}</div>
        </div>
        {offer.documents.length > 0 && <div className={styles.line}>
            <span>Invoices: </span>
            <div>{offer.documents.map(_renderDocument)}</div>
        </div>}
    </div>
});