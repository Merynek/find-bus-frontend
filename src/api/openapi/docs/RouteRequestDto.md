
# RouteRequestDto


## Properties

Name | Type
------------ | -------------
`start` | Date
`from` | [StopRequestDto](StopRequestDto.md)
`to` | [StopRequestDto](StopRequestDto.md)
`end` | Date
`direction` | [DirectionRequestDto](DirectionRequestDto.md)

## Example

```typescript
import type { RouteRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "start": null,
  "from": null,
  "to": null,
  "end": null,
  "direction": null,
} satisfies RouteRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RouteRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


