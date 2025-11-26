
# VehicleResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`status` | [VehicleStatus](VehicleStatus.md)
`name` | string
`registrationSign` | string
`vin` | string
`stkExpired` | Date
`yearOfManufacture` | number
`personsCapacity` | number
`euro` | [EuroStandard](EuroStandard.md)
`amenities` | [Array&lt;Amenities&gt;](Amenities.md)
`handicappedUserCount` | number
`departureStation` | [PlaceResponseDto](PlaceResponseDto.md)
`verificationFeedback` | [VerificationFeedbackResponseDto](VerificationFeedbackResponseDto.md)
`vehiclePhotos` | [Array&lt;VehiclePhotoResponseDto&gt;](VehiclePhotoResponseDto.md)
`vehicleDocuments` | [Array&lt;VehicleDocumentResponseDto&gt;](VehicleDocumentResponseDto.md)

## Example

```typescript
import type { VehicleResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "status": null,
  "name": null,
  "registrationSign": null,
  "vin": null,
  "stkExpired": null,
  "yearOfManufacture": null,
  "personsCapacity": null,
  "euro": null,
  "amenities": null,
  "handicappedUserCount": null,
  "departureStation": null,
  "verificationFeedback": null,
  "vehiclePhotos": null,
  "vehicleDocuments": null,
} satisfies VehicleResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VehicleResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


