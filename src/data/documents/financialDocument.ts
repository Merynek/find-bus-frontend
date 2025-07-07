import {FinancialDocumentType} from "../../api/openapi";
import {Price} from "../price";

export interface IFinancialDocumentSettings {
    id: number;
    variableSymbol: string;
    dateOfIssue: Date;
    dueDate: Date;
    price: Price;
    payed: boolean;
    type: FinancialDocumentType;
}

export class FinancialDocument {
    public id: number;
    public variableSymbol: string;
    public dateOfIssue: Date;
    public dueDate: Date;
    public type: FinancialDocumentType;
    public price: Price;
    public payed: boolean;

    constructor(settings: IFinancialDocumentSettings) {
        this.id = settings.id;
        this.variableSymbol = settings.variableSymbol;
        this.dateOfIssue = settings.dateOfIssue;
        this.dueDate = settings.dueDate;
        this.type = settings.type;
        this.price = settings.price;
        this.payed = settings.payed;
    }
}