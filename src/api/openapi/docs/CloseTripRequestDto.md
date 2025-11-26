
# CloseTripRequestDto


## Properties

Name | Type
------------ | -------------
`tripId` | number
`reason` | [CloseTripOfferReason](CloseTripOfferReason.md)
`reasonText` | string

## Example

```typescript
import type { CloseTripRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "tripId": null,
  "reason": null,
  "reasonText": null,
} satisfies CloseTripRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CloseTripRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


