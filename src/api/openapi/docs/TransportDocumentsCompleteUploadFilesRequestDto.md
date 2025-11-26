
# TransportDocumentsCompleteUploadFilesRequestDto


## Properties

Name | Type
------------ | -------------
`requirementsId` | number
`documentIdsToDelete` | Array&lt;number&gt;
`documents` | [Array&lt;CompletedTransportUploadDocumentItemRequestDto&gt;](CompletedTransportUploadDocumentItemRequestDto.md)

## Example

```typescript
import type { TransportDocumentsCompleteUploadFilesRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "requirementsId": null,
  "documentIdsToDelete": null,
  "documents": null,
} satisfies TransportDocumentsCompleteUploadFilesRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransportDocumentsCompleteUploadFilesRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


