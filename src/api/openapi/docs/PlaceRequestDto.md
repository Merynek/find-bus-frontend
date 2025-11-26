
# PlaceRequestDto


## Properties

Name | Type
------------ | -------------
`placeId` | string
`point` | [GeoPointDto](GeoPointDto.md)
`country` | [Country](Country.md)
`name` | string
`placeFormatted` | string

## Example

```typescript
import type { PlaceRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "placeId": null,
  "point": null,
  "country": null,
  "name": null,
  "placeFormatted": null,
} satisfies PlaceRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlaceRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


