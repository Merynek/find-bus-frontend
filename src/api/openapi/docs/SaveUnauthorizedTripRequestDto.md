
# SaveUnauthorizedTripRequestDto


## Properties

Name | Type
------------ | -------------
`tripId` | number
`name` | string
`routes` | [Array&lt;RouteRequestDto&gt;](RouteRequestDto.md)
`numberOfPersons` | number
`amenities` | [Array&lt;Amenities&gt;](Amenities.md)
`handicappedUserCount` | number
`dietForTransporter` | boolean
`endOrder` | Date
`email` | string

## Example

```typescript
import type { SaveUnauthorizedTripRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "tripId": null,
  "name": null,
  "routes": null,
  "numberOfPersons": null,
  "amenities": null,
  "handicappedUserCount": null,
  "dietForTransporter": null,
  "endOrder": null,
  "email": null,
} satisfies SaveUnauthorizedTripRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SaveUnauthorizedTripRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


