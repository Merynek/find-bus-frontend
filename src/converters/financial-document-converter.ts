import {FinancialDocumentResponseDto} from "../api/openapi";
import {PriceConverter} from "./price-converter";
import {FinancialDocument} from "@/src/data/documents/financialDocument";

export class FinancialDocumentConverter {
    public static toInstance(response: FinancialDocumentResponseDto): FinancialDocument {
        return new FinancialDocument({
            id: response.id,
            price: PriceConverter.toInstance(response.price),
            dueDate: response.dueDate,
            dateOfIssue: response.dateOfIssue,
            payed: response.payed,
            type: response.type,
            variableSymbol: response.variableSymbol,
            internalDocumentNumber: response.internalDocumentNumber
        })
    }

    public static toJson(document: FinancialDocument): FinancialDocumentResponseDto {
        return {
            id: document.id,
            variableSymbol: document.variableSymbol,
            dateOfIssue: document.dateOfIssue,
            dueDate: document.dueDate,
            type: document.type,
            price: PriceConverter.toJson(document.price),
            payed: document.payed,
            internalDocumentNumber: document.internalDocumentNumber
        }
    }
}