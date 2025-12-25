
# TripItemResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`routes` | [Array&lt;RouteItemResponseDto&gt;](RouteItemResponseDto.md)
`amenities` | [Array&lt;Amenities&gt;](Amenities.md)
`name` | string
`state` | [TripState](TripState.md)
`numberOfPersons` | number
`totalDistanceInMeters` | number
`handicappedUserCount` | number
`dietForTransporter` | boolean
`endOrder` | Date
`orderHasEnded` | boolean
`offerState` | [TripOfferState](TripOfferState.md)
`alreadyOffered` | boolean
`isMine` | boolean
`hasOffers` | boolean
`created` | Date
`rating` | number

## Example

```typescript
import type { TripItemResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "routes": null,
  "amenities": null,
  "name": null,
  "state": null,
  "numberOfPersons": null,
  "totalDistanceInMeters": null,
  "handicappedUserCount": null,
  "dietForTransporter": null,
  "endOrder": null,
  "orderHasEnded": null,
  "offerState": null,
  "alreadyOffered": null,
  "isMine": null,
  "hasOffers": null,
  "created": null,
  "rating": null,
} satisfies TripItemResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TripItemResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


