
# TransportDocumentResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`type` | [TransportRequirementsType](TransportRequirementsType.md)
`file` | [FileResponseDto](FileResponseDto.md)

## Example

```typescript
import type { TransportDocumentResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "file": null,
} satisfies TransportDocumentResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransportDocumentResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


