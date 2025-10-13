import {UserAddress} from "@/src/data/users/userAddress";

interface IUserFinancialSettings {
    name: string;
    surname: string;
    ico: string;
    dic: string;
    companyName: string;
    isCompany: boolean;
    iban: string;
    swift: string;
    address?: UserAddress;
    mailingAddress?: UserAddress;
}

export class UserFinancialSettings {
    public name: string;
    public surname: string;
    public ico: string;
    public dic: string;
    public companyName: string;
    public isCompany: boolean;
    public iban: string;
    public swift: string;
    public address?: UserAddress;
    public mailingAddress?: UserAddress;

    constructor(data: IUserFinancialSettings) {
        this.name = data.name;
        this.surname = data.surname;
        this.ico = data.ico;
        this.dic = data.dic;
        this.companyName = data.companyName;
        this.isCompany = data.isCompany;
        this.iban = data.iban;
        this.swift = data.swift;
        this.address = data.address;
        this.mailingAddress = data.mailingAddress;
    }

    public static create() {
        return new UserFinancialSettings({
            name: "",
            surname: "",
            ico: "",
            dic: "",
            companyName: "",
            isCompany: false,
            iban: "",
            swift: "",
            address: UserAddress.create(),
            mailingAddress: UserAddress.create()
        })
    }
}