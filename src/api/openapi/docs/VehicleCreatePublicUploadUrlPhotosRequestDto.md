
# VehicleCreatePublicUploadUrlPhotosRequestDto


## Properties

Name | Type
------------ | -------------
`vehicleId` | number
`photos` | [Array&lt;UploadPublicPhotoItemRequestDto&gt;](UploadPublicPhotoItemRequestDto.md)

## Example

```typescript
import type { VehicleCreatePublicUploadUrlPhotosRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "vehicleId": null,
  "photos": null,
} satisfies VehicleCreatePublicUploadUrlPhotosRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VehicleCreatePublicUploadUrlPhotosRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


