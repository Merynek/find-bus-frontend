
# CurrentUserDto


## Properties

Name | Type
------------ | -------------
`id` | number
`email` | string
`role` | [UserRole](UserRole.md)

## Example

```typescript
import type { CurrentUserDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "role": null,
} satisfies CurrentUserDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CurrentUserDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


