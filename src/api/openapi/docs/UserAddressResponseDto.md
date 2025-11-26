
# UserAddressResponseDto


## Properties

Name | Type
------------ | -------------
`country` | [Country](Country.md)
`city` | string
`psc` | string
`street` | string
`houseNumber` | string

## Example

```typescript
import type { UserAddressResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "country": null,
  "city": null,
  "psc": null,
  "street": null,
  "houseNumber": null,
} satisfies UserAddressResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserAddressResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


