
# AcceptOfferRequestDto


## Properties

Name | Type
------------ | -------------
`offerId` | number
`acceptMethod` | [TripOfferAcceptMethod](TripOfferAcceptMethod.md)
`clientRowVersion` | string

## Example

```typescript
import type { AcceptOfferRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "offerId": null,
  "acceptMethod": null,
  "clientRowVersion": null,
} satisfies AcceptOfferRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AcceptOfferRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


