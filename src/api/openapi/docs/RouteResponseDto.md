
# RouteResponseDto


## Properties

Name | Type
------------ | -------------
`start` | Date
`from` | [StopResponseDto](StopResponseDto.md)
`to` | [StopResponseDto](StopResponseDto.md)
`end` | Date
`direction` | [DirectionResponseDto](DirectionResponseDto.md)

## Example

```typescript
import type { RouteResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "start": null,
  "from": null,
  "to": null,
  "end": null,
  "direction": null,
} satisfies RouteResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RouteResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


