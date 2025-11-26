
# UserFinancialSettingsRequestDto


## Properties

Name | Type
------------ | -------------
`name` | string
`surname` | string
`ico` | string
`dic` | string
`companyName` | string
`isCompany` | boolean
`address` | [UserAddressRequestDto](UserAddressRequestDto.md)
`mailingAddress` | [UserAddressRequestDto](UserAddressRequestDto.md)
`iban` | string
`swift` | string

## Example

```typescript
import type { UserFinancialSettingsRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "surname": null,
  "ico": null,
  "dic": null,
  "companyName": null,
  "isCompany": null,
  "address": null,
  "mailingAddress": null,
  "iban": null,
  "swift": null,
} satisfies UserFinancialSettingsRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserFinancialSettingsRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


