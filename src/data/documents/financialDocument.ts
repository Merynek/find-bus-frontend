import {FinancialDocumentResponseDto, FinancialDocumentType} from "../../api/openapi";
import {Price} from "../price";

export interface IFinancialDocumentSettings {
    id: number;
    variableSymbol: string;
    dateOfIssue: Date;
    dueDate: Date;
    price: Price;
    payed: boolean;
    internalDocumentNumber: string;
    type: FinancialDocumentType;
}

export class FinancialDocument {
    public id: number;
    public variableSymbol: string;
    public dateOfIssue: Date;
    public dueDate: Date;
    public type: FinancialDocumentType;
    public internalDocumentNumber: string;
    public price: Price;
    public payed: boolean;

    constructor(settings: IFinancialDocumentSettings) {
        this.id = settings.id;
        this.variableSymbol = settings.variableSymbol;
        this.dateOfIssue = settings.dateOfIssue;
        this.internalDocumentNumber = settings.internalDocumentNumber;
        this.dueDate = settings.dueDate;
        this.type = settings.type;
        this.price = settings.price;
        this.payed = settings.payed;
    }

    public toJson(): FinancialDocumentResponseDto {
        return {
            id: this.id,
            variableSymbol: this.variableSymbol,
            dateOfIssue: this.dateOfIssue,
            dueDate: this.dueDate,
            type: this.type,
            price: this.price.toJson(),
            payed: this.payed,
            internalDocumentNumber: this.internalDocumentNumber
        }
    }
}