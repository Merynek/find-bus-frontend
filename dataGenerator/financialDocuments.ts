import {getRandomBoolean, getRandomEnum, getRandomId} from "./tools";
import {
    FinancialDocumentType,
} from "@/src/api/openapi";
import {getRandomDate} from "./time";
import {getRandomPrice} from "./price";
import {getRandomText} from "./texts/texts";
import {FinancialDocument} from "@/src/data/documents/financialDocument";

export function getRandomFinancialDocument(): FinancialDocument {
    return new FinancialDocument({
        id: getRandomId(),
        price: getRandomPrice(),
        variableSymbol: getRandomText(1),
        type: getRandomEnum(FinancialDocumentType),
        payed: getRandomBoolean(),
        dueDate: getRandomDate(),
        dateOfIssue: getRandomDate(),
        internalDocumentNumber: getRandomText(10)
    })
}