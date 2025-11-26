
# FileResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`path` | string
`type` | [FileType](FileType.md)
`storageCategory` | [FileStorageCategory](FileStorageCategory.md)

## Example

```typescript
import type { FileResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "path": null,
  "type": null,
  "storageCategory": null,
} satisfies FileResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


