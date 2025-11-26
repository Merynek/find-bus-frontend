
# VehicleCreateUploadUrlFilesRequestDto


## Properties

Name | Type
------------ | -------------
`vehicleId` | number
`photos` | [Array&lt;UploadPhotoItemRequestDto&gt;](UploadPhotoItemRequestDto.md)
`documents` | [Array&lt;UploadDocumentItemRequestDto&gt;](UploadDocumentItemRequestDto.md)

## Example

```typescript
import type { VehicleCreateUploadUrlFilesRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "vehicleId": null,
  "photos": null,
  "documents": null,
} satisfies VehicleCreateUploadUrlFilesRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VehicleCreateUploadUrlFilesRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


