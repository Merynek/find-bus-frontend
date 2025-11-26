
# TripResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`ownerId` | number
`state` | [TripState](TripState.md)
`routes` | [Array&lt;RouteResponseDto&gt;](RouteResponseDto.md)
`amenities` | [Array&lt;Amenities&gt;](Amenities.md)
`numberOfPersons` | number
`handicappedUserCount` | number
`totalDistanceInMeters` | number
`dietForTransporter` | boolean
`endOrder` | Date
`orderHasEnded` | boolean
`offerState` | [TripOfferState](TripOfferState.md)
`created` | Date

## Example

```typescript
import type { TripResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "ownerId": null,
  "state": null,
  "routes": null,
  "amenities": null,
  "numberOfPersons": null,
  "handicappedUserCount": null,
  "totalDistanceInMeters": null,
  "dietForTransporter": null,
  "endOrder": null,
  "orderHasEnded": null,
  "offerState": null,
  "created": null,
} satisfies TripResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TripResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


