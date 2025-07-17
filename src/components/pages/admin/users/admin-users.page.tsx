import React from "react";
import {LayoutFlexColumn} from "../../../components/layout/layout-flex-column/layout-flex-column";
import styles from "./admin-users.page.module.scss";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {LayoutFlexRow} from "../../../components/layout/layout-flex-row/layout-flex-row";
import {UserAddress} from "@/src/data/users/userAddress";
import {TransferInfo} from "@/src/data/transferInfo";
import {VehicleDetail} from "../../../compositions/vehicle/detail-list/vehicle-detail-list";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {MediaElement} from "../../../components/media-element/media-element";
import {VehicleVerifyButton} from "@/src/components/pages/admin/users/vehicle-verify-button";
import {UserVerifyButton} from "@/src/components/pages/admin/users/user-verify-button";

export interface IUsersListParams {
    users: UserAdminDetail[];
}

const AdminUsersPage = (props: IUsersListParams) => {
    const {users} = props;

    const _renderTransferInfo = (info: TransferInfo) => {
        return <LayoutFlexColumn>
            <LayoutFlexRow>
                <span>Iban: </span>
                <span>{info.iban}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>Swift: </span>
                <span>{info.swift}</span>
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    const _renderTransporterRequirements = (requirements: TransportRequirements) => {
        return <LayoutFlexColumn>
            <LayoutFlexRow>
                <span>ConcessionNumber: </span>
                <span>{requirements.concessionNumber}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                {requirements.concessionDocuments && <div>
                    <span>ConcessionDocuments: </span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={requirements.concessionDocuments}
                        />
                    </div>
                </div>}
            </LayoutFlexRow>
            <LayoutFlexRow>
                {requirements.businessRiskInsurance && <div>
                    <span>BusinessRiskInsurance: </span>
                    <div className={styles.photo}>
                        <MediaElement
                            mediaItem={requirements.businessRiskInsurance}
                        />
                    </div>
                </div>}
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    const _renderAddress = (address: UserAddress) => {
        return <LayoutFlexColumn>
            <LayoutFlexRow>
                <span>Address: </span>
                <span>{address.street + " " + address.houseNumber}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>PSC: </span>
                <span>{address.psc}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>City: </span>
                <span>{address.city}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>Country: </span>
                <span>{address.country}</span>
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    const _renderUser = (user: UserAdminDetail) => {
        return <LayoutFlexColumn key={user.id}>
            <LayoutFlexRow>
                <span>Email: </span>
                <span>{user.email}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>Jmeno: </span>
                <span>{user.name + " " + user.surname}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>Is Company: </span>
                <span>{user.isCompany.toString()}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>ICO: </span>
                <span>{user.ico}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>DIC: </span>
                <span>{user.dic}</span>
            </LayoutFlexRow>
            <LayoutFlexRow>
                <span>PhoneNumber: </span>
                <span>{user.phoneNumber}</span>
            </LayoutFlexRow>
            <h3>Address</h3>
            {_renderAddress(user.address)}
            <h3>Mailing Address</h3>
            {_renderAddress(user.mailingAddress)}
            <h3>Transfer Info</h3>
            {_renderTransferInfo(user.transferInfo)}
            <h3>Transport Requirements</h3>
            {_renderTransporterRequirements(user.transportRequirements)}
            <h2>Vehicles</h2>
            <LayoutFlexColumn>
                {user.vehicles.map(v => {
                    return <LayoutFlexColumn key={v.id}>
                        <VehicleDetail vehicle={v} />
                        <VehicleVerifyButton vehicle={v.toJson()} />
                    </LayoutFlexColumn>
                })}
            </LayoutFlexColumn>
            <LayoutFlexColumn>
                <h2>{user.isVerifiedForTransporting ? "USER IS Verified" : "USER NOT Verified"}</h2>
                <UserVerifyButton user={user.toJson()} />
            </LayoutFlexColumn>
        </LayoutFlexColumn>
    }

    return <div className={styles.layout}>
        {users.map((user, index) => {
            return <LayoutFlexColumn key={user.id}>
                <h1>{(index + 1) + "."}</h1>
                {_renderUser(user)}
            </LayoutFlexColumn>
        })}
    </div>
};

export default AdminUsersPage;