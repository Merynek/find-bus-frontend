
# TripOfferMovementsResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`tripId` | number
`from` | [TripOfferState](TripOfferState.md)
`to` | [TripOfferState](TripOfferState.md)
`datetime` | Date
`reason` | [CloseTripOfferReason](CloseTripOfferReason.md)
`customReason` | string

## Example

```typescript
import type { TripOfferMovementsResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "tripId": null,
  "from": null,
  "to": null,
  "datetime": null,
  "reason": null,
  "customReason": null,
} satisfies TripOfferMovementsResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TripOfferMovementsResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


