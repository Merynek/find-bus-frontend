
# VehicleCompletePublicUploadPhotosRequestDto


## Properties

Name | Type
------------ | -------------
`vehicleId` | number
`photoIdsToDelete` | Array&lt;number&gt;
`photos` | [Array&lt;CompletedPublicUploadPhotoItemRequestDto&gt;](CompletedPublicUploadPhotoItemRequestDto.md)

## Example

```typescript
import type { VehicleCompletePublicUploadPhotosRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "vehicleId": null,
  "photoIdsToDelete": null,
  "photos": null,
} satisfies VehicleCompletePublicUploadPhotosRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VehicleCompletePublicUploadPhotosRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


