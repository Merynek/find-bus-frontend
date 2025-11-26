
# VehicleCompleteUploadFilesRequestDto


## Properties

Name | Type
------------ | -------------
`vehicleId` | number
`photoIdsToDelete` | Array&lt;number&gt;
`documentIdsToDelete` | Array&lt;number&gt;
`photos` | [Array&lt;CompletedUploadPhotoItemRequestDto&gt;](CompletedUploadPhotoItemRequestDto.md)
`documents` | [Array&lt;CompletedUploadDocumentItemRequestDto&gt;](CompletedUploadDocumentItemRequestDto.md)

## Example

```typescript
import type { VehicleCompleteUploadFilesRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "vehicleId": null,
  "photoIdsToDelete": null,
  "documentIdsToDelete": null,
  "photos": null,
  "documents": null,
} satisfies VehicleCompleteUploadFilesRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VehicleCompleteUploadFilesRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


