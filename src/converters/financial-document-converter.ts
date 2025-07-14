import {FinancialDocumentResponseDto} from "../api/openapi";
import {PriceConverter} from "./price-converter";
import {FinancialDocument} from "@/src/data/documents/financialDocument";

export class FinancialDocumentConverter {
    public static toClient(response: FinancialDocumentResponseDto): FinancialDocument {
        return new FinancialDocument({
            id: response.id,
            price: PriceConverter.toClient(response.price),
            dueDate: response.dueDate,
            dateOfIssue: response.dateOfIssue,
            payed: response.payed,
            type: response.type,
            variableSymbol: response.variableSymbol,
            internalDocumentNumber: response.internalDocumentNumber
        })
    }
}