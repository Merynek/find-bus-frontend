
# CompletedUploadPhotoItemRequestDto


## Properties

Name | Type
------------ | -------------
`blobName` | string
`contentType` | string
`fileSize` | number
`originalFileName` | string
`type` | [VehiclePhotoType](VehiclePhotoType.md)

## Example

```typescript
import type { CompletedUploadPhotoItemRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "blobName": null,
  "contentType": null,
  "fileSize": null,
  "originalFileName": null,
  "type": null,
} satisfies CompletedUploadPhotoItemRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CompletedUploadPhotoItemRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


