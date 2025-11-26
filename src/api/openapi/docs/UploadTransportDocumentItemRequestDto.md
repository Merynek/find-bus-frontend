
# UploadTransportDocumentItemRequestDto


## Properties

Name | Type
------------ | -------------
`clientFileId` | string
`fileName` | string
`type` | [TransportRequirementsType](TransportRequirementsType.md)

## Example

```typescript
import type { UploadTransportDocumentItemRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "clientFileId": null,
  "fileName": null,
  "type": null,
} satisfies UploadTransportDocumentItemRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UploadTransportDocumentItemRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


