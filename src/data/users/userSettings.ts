import {computed, makeObservable, observable} from "mobx";
import {NotificationsEnum} from "../../api/openapi";
import {UserAddress} from "./userAddress";
import {TransferInfo} from "../transferInfo";
import {TransportRequirements} from "../transportRequirements";

export interface IUserSettings {
    name: string;
    surname: string;
    phoneNumber: string;
    ico: string;
    dic: string;
    companyName: string;
    isCompany: boolean;
    notifications: NotificationsEnum[];
    address: UserAddress;
    mailingAddress: UserAddress;
    transferInfo: TransferInfo;
    transportRequirements: TransportRequirements;
    isVerifiedForTransporting: boolean;
}

export class UserSettings {
    @observable public name: string;
    @observable public surname: string;
    @observable public phoneNumber: string;
    @observable public isCompany: boolean;
    @observable public ico: string;
    @observable public dic: string;
    @observable public companyName: string;
    public notifications: NotificationsEnum[];
    @observable public address: UserAddress;
    @observable public mailingAddress: UserAddress;
    @observable public transferInfo: TransferInfo;
    @observable public transportRequirements: TransportRequirements;
    public readonly isVerifiedForTransporting: boolean;

    constructor(settings: IUserSettings) {
        this.name = settings.name;
        this.surname = settings.surname;
        this.phoneNumber = settings.phoneNumber;
        this.isCompany = settings.isCompany;
        this.ico = settings.ico;
        this.dic = settings.dic;
        this.companyName = settings.companyName;
        this.notifications = settings.notifications;
        this.address = settings.address;
        this.mailingAddress = settings.mailingAddress;
        this.transferInfo = settings.transferInfo;
        this.transportRequirements = settings.transportRequirements;
        this.isVerifiedForTransporting = settings.isVerifiedForTransporting;
        makeObservable(this);
    }

    @computed
    get isValidForCreateInvoice(): boolean {
        if (this.name && this.surname && this.companyName) {
            if (this.addressIsValidForInvoice) {
                if (this.isCompany) {
                    return Boolean(this.ico)
                }
                return true;
            }
        }
        return false
    }

    @computed
    get addressIsValidForInvoice() {
        return this.mailingAddress.isValidForCreateInvoice || this.address.isValidForCreateInvoice;
    }
}