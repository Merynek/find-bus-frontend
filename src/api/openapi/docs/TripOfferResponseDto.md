
# TripOfferResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`user` | [UserDetailResponseDto](UserDetailResponseDto.md)
`clientRowVersion` | string
`vehicle` | [VehicleResponseDto](VehicleResponseDto.md)
`price` | [PriceDto](PriceDto.md)
`canceled` | boolean
`accepted` | boolean
`endOfferDate` | Date
`canceledReason` | [OfferCanceledReason](OfferCanceledReason.md)
`acceptOfferDate` | Date
`documents` | [Array&lt;FinancialDocumentResponseDto&gt;](FinancialDocumentResponseDto.md)

## Example

```typescript
import type { TripOfferResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "user": null,
  "clientRowVersion": null,
  "vehicle": null,
  "price": null,
  "canceled": null,
  "accepted": null,
  "endOfferDate": null,
  "canceledReason": null,
  "acceptOfferDate": null,
  "documents": null,
} satisfies TripOfferResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TripOfferResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


