
# UserFinancialSettingsResponseDto


## Properties

Name | Type
------------ | -------------
`name` | string
`surname` | string
`ico` | string
`dic` | string
`companyName` | string
`isCompany` | boolean
`iban` | string
`swift` | string
`address` | [UserAddressResponseDto](UserAddressResponseDto.md)
`mailingAddress` | [UserAddressResponseDto](UserAddressResponseDto.md)

## Example

```typescript
import type { UserFinancialSettingsResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "surname": null,
  "ico": null,
  "dic": null,
  "companyName": null,
  "isCompany": null,
  "iban": null,
  "swift": null,
  "address": null,
  "mailingAddress": null,
} satisfies UserFinancialSettingsResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserFinancialSettingsResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


