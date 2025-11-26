
# VehiclePhotoResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`type` | [VehiclePhotoType](VehiclePhotoType.md)
`file` | [FileResponseDto](FileResponseDto.md)
`publicFile` | [FileResponseDto](FileResponseDto.md)

## Example

```typescript
import type { VehiclePhotoResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "file": null,
  "publicFile": null,
} satisfies VehiclePhotoResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VehiclePhotoResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


