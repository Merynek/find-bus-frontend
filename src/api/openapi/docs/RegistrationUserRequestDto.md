
# RegistrationUserRequestDto


## Properties

Name | Type
------------ | -------------
`email` | string
`password` | string
`confirmPassword` | string
`role` | [UserRole](UserRole.md)
`locale` | [Locales](Locales.md)

## Example

```typescript
import type { RegistrationUserRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "email": null,
  "password": null,
  "confirmPassword": null,
  "role": null,
  "locale": null,
} satisfies RegistrationUserRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RegistrationUserRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


