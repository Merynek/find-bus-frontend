
# FinancialDocumentResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`variableSymbol` | string
`internalDocumentNumber` | string
`dateOfIssue` | Date
`dueDate` | Date
`type` | [FinancialDocumentType](FinancialDocumentType.md)
`price` | [PriceDto](PriceDto.md)
`payed` | boolean

## Example

```typescript
import type { FinancialDocumentResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "variableSymbol": null,
  "internalDocumentNumber": null,
  "dateOfIssue": null,
  "dueDate": null,
  "type": null,
  "price": null,
  "payed": null,
} satisfies FinancialDocumentResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FinancialDocumentResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


